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
    const orderAmount = useRef()
    const [completeOrders, setCompleteOrders] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getSettings = () => {
      fetch(`http://192.168.21.117:8000/stores?merchant=${localStorage.getItem("id")}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(response => {
          setSettings(response[0])
          orderAmount.current.value = response[0].vend_limit
      })
    }



    useEffect(() => {
    getSettings()
    }, [])


    console.log("what setting be", setting)

    const limit = (val, max, money) => {
        if (val.length === 1) {
            val = val + '0';
        }

        if (val.length === 1 && val[0] > max[0]) {
            val = '0' + val;
        }

        if (val.length === 2) {
            if (Number(val) === 0) {
            val = '00';

            //this can happen when user paste number
        } else if (val > max) {
            val = max;
            }
        }

        if (money === true) {
            if (val.length === 3) {
                if (Number(val) === 0) {
                    val = '001';
                }
            }
        }

        return val;
    }

    const moneyMax = (val) => {
        let money = limit(val.substring(0, 3), '999', true)

        orderAmount.current.value = money
        return "$" + money
    }




    console.log("orderamount", orderAmount.current !== undefined)
    const checkValue = () => {
      console.log(orderAmount.current.value >= 1)
      if (orderAmount.current !== undefined && orderAmount.current.value >= 1) {
        console.log("hello person", orderAmount.current, orderAmount.current.value)
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


    return(
      <>
          <section className="store-profile">
            <div className="edit-form">
              <h1>{props.store.store_name} Profile</h1>
              <h4>Order Amount:</h4>
              <div className="vend-amount">
                <NumberFormat placeholder="$000" onChange={checkValue} ref={orderAmount} className="form-vend" thousandSeparator={true} format={moneyMax} />
              </div>
              <h4>Vend Time Range:</h4>
              <div className="time-range">
                  <label htmlFor="denomination"> Order Denomination </label>
                  <select name="denomination" className="dropdown">
                    <option value="select-domination">Select Denomination</option>
                    {denom}
                  </select>
              </div>
              <button className="change-settings">Create Order</button>
            </div>
          </section>
      </>
    )
  }

export default CreateOrder