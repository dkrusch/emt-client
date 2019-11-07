import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import OrderHistory from "../order-history/OrderHistory"
import "./CreateOrder.css"
import "../auth/Welcome.css"
import NumberFormat from 'react-number-format';


const CreateOrder = props => {
    const [store, setStore] = useState({})
    const [paymentList, setPaymentList] = useState([])
    const [denom, setDenom] = useState("")
    const [denomValue, setDenomValue] = useState("")
    const [paymentValue, setPaymentValue] = useState("")
    const orderAmount = useRef()
    const [completeOrders, setCompleteOrders] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    console.log("henlo")
    const getStores = () => {
      console.log("HELLO", props.storeId)
      fetch(`http://192.168.21.117:8000/stores/${props.storeId}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(response => {
          setStore(response)
          orderAmount.current.value = response.vend_limit
      })
    }

    const getCompleteOrders = () => {
      console.log("store", store)
      if (store.merchant) {
        fetch(`http://192.168.21.117:8000/orders?merchant=${store.merchant.id}&complete=1`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(response => response.json())
        .then(setCompleteOrders)
      }
    }

    const getPaymentList = () => {
      fetch(`http://192.168.21.117:8000/payments?customer=${localStorage.getItem("id")}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(response => {
          setPaymentList(response)
      })
    }

    useEffect(() => {
      getStores()
      getPaymentList()
    }, [])

    useEffect(() => {
      getCompleteOrders()
    }, [store])

    let vendAmount = store.vend_limit

    let checkDate = new Date()
    let earned = 0
    let vended = 0
    let completedOrders = 0
    let amountLeft = 0


    completeOrders.map(order => {
      if (checkDate.toISOString().substring(0, 10) === order.time_complete.substring(0, 10))
      {
        vended += order.vend_amount
        earned += 1
        completedOrders += 1
        amountLeft = vendAmount - vended
      }
    })


    const limit = (val, max, money) => {
        if (val.length === 1) {
            val = val + '0';
        }

        if (val.length === 1 && val[0] > max[0]) {
            val = '0' + val;
        }

        if (val.length === 2 && val[1] > max[1]) {
            if (Number(val) === 0) {
            val = '00';

            //this can happen when user paste number
        } else if (val > max) {
            val = max;
            }
        }

        if (val > max) {
          val = max;
        }

        return val;
    }

    const moneyMax = (val) => {
        let money = limit(val.substring(0, 3), amountLeft, true)

        orderAmount.current.value = money
        return "$" + money
    }

    const createOrder = (denomin) => {
      fetch(`http://192.168.21.117:8000/orders`, {
          "method": "POST",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          },
          "body": JSON.stringify({
            store_id: store.id,
            payment_type: parseInt(paymentValue),
            customer_id: localStorage.getItem("id"),
            vend_amount: parseInt(orderAmount.current.value),
            created_date: new Date().toISOString(),
            denomination: parseInt(denomValue)
          })
      })
      .then(response => response.json())
      .then(() => {
        props.history.push("/stores")
      })
    }

    const checkOrder = () => {
      console.log(denomValue)
      if (denomValue === "select-denomination")
      {
        alert ("Please select a valid denomination")
        return
      }
      if (paymentValue === "" || paymentValue === "select")
      {
        alert ("Please select a valid payment option")
      }
      else
      {
        createOrder()
      }
    }

    const createLocal = (newDate) => {
      let basicTime = parseInt(newDate.toISOString().substring(11, 19)) - 6
      if (basicTime < 0)
      {
        basicTime = basicTime + 24
      }
      return basicTime
    }

    const checkTime = () => {
      let newDate = new Date()
      let uniTime = checkDate.toISOString().substring(11, 19)
      let localTime = createLocal(newDate)

      localTime = localTime.toString()
      if (localTime.length === 1)
      {
        localTime = "0" + localTime
      }

      if ((localTime + uniTime.substring(2)) > store.end_time || (localTime + uniTime.substring(2)) < store.start_time)
      {
        alert("Sorry, this store is no longer taking orders.")
      }
      else
      {
        if (orderAmount.current.value > 0)
        {
          checkOrder()
        }
        else
        {
          alert("Please enter a valid order amount.")
        }
      }
    }

    const checkValue = () => {
      if (orderAmount.current !== undefined && orderAmount.current.value >= 1) {
        setDenom(<option value="1">1</option>)
        if (orderAmount.current.value >= 5) {
          setDenom(
          <>
            <option value="1">1</option>
            <option value="5">5</option>
          </>)
          if (orderAmount.current.value >= 20) {
            setDenom(
            <>
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="20">20</option>
            </>)
          }
        }
      }
    }

    const handleChange = (event) => {
      setDenomValue(event.target.value)
    }

    const handlePayment = (event) => {
      setPaymentValue(event.target.value)
    }

    return(
      <>
          <section className="store-profile">
            <div className="edit-form">
              <h2>Place Order at {store.store_name}</h2>
              <h3>Amount Available: ${amountLeft}</h3>
              <h4>Order Amount:</h4>
              <div className="vend-amount">
                <NumberFormat placeholder="$000" onChange={checkValue} ref={orderAmount} className="form-vend" thousandSeparator={true} format={moneyMax} />
              </div>
              <h4>Vend Time Range:</h4>
              <div className="denomination">
                  <label htmlFor="denomination"> Order Denomination </label>
                  <select name="denomination" className="dropdown" value={denomValue} onChange={e => handleChange(e)}>
                    <option value="select-denomination">Select Denomination</option>
                    {denom}
                  </select>
              </div>
              <div className="payment">
                  <label htmlFor="denomination"> Payment </label>
                  <select name="denomination" className="dropdown" value={paymentValue} onChange={e => handlePayment(e)}>
                    <option value="select">Select Payment</option>
                    {
                      paymentList.map(payment => {
                        console.log("PAY", payment)
                        return <option value={payment.id}>... {payment.account_number.substring(14)}</option>
                      })
                    }
                  </select>
              </div>
              <button className="change-settings" onClick={checkTime}>Create Order</button>
            </div>
          </section>
      </>
    )
  }

export default CreateOrder