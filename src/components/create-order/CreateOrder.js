import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import OrderHistory from "../order-history/OrderHistory"
import "./CreateOrder.css"
import NumberFormat from 'react-number-format';


const CreateOrder = props => {
    const [setting, setSettings] = useState({})
    const [denom, setDenom] = useState("")
    const [denomValue, setDenomValue] = useState("")
    const orderAmount = useRef()
    const [completeOrders, setCompleteOrders] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getStores = () => {
      fetch(`http://192.168.21.117:8000/stores/${props.store.id}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(response => {
          console.log("snee", response)
          setSettings(response)
          orderAmount.current.value = response.vend_limit
      })
    }

    const getCompleteOrders = () => {
      fetch(`http://192.168.21.117:8000/orders?merchant=1&complete=1`, {
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

    useEffect(() => {
      getStores()
      getCompleteOrders()
    }, [])

    let vendAmount = props.store.vend_limit

    let checkDate = new Date()
    let earned = 0
    let vended = 0
    let completedOrders = 0

    console.log("completeorders", completeOrders)

    completeOrders.map(order => {
      console.log("hello", checkDate.toISOString().substring(0, 10), order.time_complete.substring(0, 10))
      if (checkDate.toISOString().substring(0, 10) === order.time_complete.substring(0, 10))
      {
        vended += order.vend_amount
        vendAmount = vendAmount - vended
        earned += 1
        completedOrders += 1
      }
    })

    console.log("what setting be", setting)

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

        // if (money === true) {
        //     if (val.length === 3) {
        //         if (Number(val) === 0) {
        //             val = '001';
        //         }
        //     }
        // }

        return val;
    }

    const moneyMax = (val) => {
      console.log("vendamount", vendAmount)
        let money = limit(val.substring(0, 3), vendAmount, true)

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
            store_id: props.store.id,
            payment_type: 2,
            customer_id: localStorage.getItem("id"),
            vend_amount: parseInt(orderAmount.current.value),
            created_date: new Date().toISOString(),
            denomination: parseInt(denomValue)
          })
      })
      .then(response => response.json())
      .then(() => getCompleteOrders())
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

      if ((localTime + uniTime.substring(2)) > props.store.end_time || (localTime + uniTime.substring(2)) < props.store.start_time)
      {
        alert("Sorry, this store is no longer taking orders.")
      }
      else
      {
        if (orderAmount.current.value > 0)
        {
          console.log("value", denomValue)
          createOrder()
        }
        else
        {
          console.log(orderAmount)
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

    return(
      <>
          <section className="store-profile">
            <div className="edit-form">
              <h1>Place Order at {props.store.store_name}</h1>
              <h2>Amount Available: {vendAmount}</h2>
              <h4>Order Amount:</h4>
              <div className="vend-amount">
                <NumberFormat placeholder="$000" onChange={checkValue} ref={orderAmount} className="form-vend" thousandSeparator={true} format={moneyMax} />
              </div>
              <h4>Vend Time Range:</h4>
              <div className="time-range">
                  <label htmlFor="denomination"> Order Denomination </label>
                  <select name="denomination" className="dropdown" value={denomValue} onChange={e => handleChange(e)}>
                    <option value="select-domination">Select Denomination</option>
                    {denom}
                  </select>
              </div>
              <button className="change-settings" onClick={checkTime}>Create Order</button>
            </div>
          </section>
      </>
    )
  }

export default CreateOrder