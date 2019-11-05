import React, { useEffect, useState, useRef } from "react"
import "./StoreProfile.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import OrderHistory from "../order-history/OrderHistory"
import NumberFormat from 'react-number-format';


const StoreProfile = props => {
    const [setting, setSettings] = useState({})
    const startTime = useRef()
    const endTime = useRef()
    const vendLimit = useRef()
    const [completeOrders, setCompleteOrders] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getSettings = () => {
      fetch(`http://192.168.1.4:8000/stores?merchant=${localStorage.getItem("id")}`, {
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
          startTime.current.value = response[0].start_time
          endTime.current.value = response[0].end_time
          vendLimit.current.value = response[0].vend_limit
      })
    }

    const getCompleteOrders = () => {
        fetch(`http://192.168.1.4:8000/orders?merchant=1&complete=1`, {
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
    getSettings()
    getCompleteOrders()
    }, [])


    console.log("what setting be", setting)

    const changeSettings = () => {
        if (startTime.current.value > endTime.current.value) {
            alert("The start time should not be after the end time.")
            return true
        }
        fetch(`http://192.168.1.4:8000/stores/${setting.id}`, {
            "method": "PUT",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "start_time": startTime.current.value,
                "end_time": endTime.current.value,
                "vend_limit": vendLimit.current.value
            })
        })
        .then(() => getSettings())
      }

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

    const starttimeMax = (val) => {
        let hour = limit(val.substring(0, 2), '24')
        let min = limit(val.substring(2, 4), '60')
        let sec = limit(val.substring(4, 6), '60')

        startTime.current.value = hour + ":" + min + ":" + sec
        return hour + ":" + min + ":" + sec
    }

    const endtimeMax = (val) => {
        let hour = limit(val.substring(0, 2), '24')
        let min = limit(val.substring(2, 4), '60')
        let sec = limit(val.substring(4, 6), '60')

        endTime.current.value = hour + ":" + min + ":" + sec
        return hour + ":" + min + ":" + sec
    }

    const moneyMax = (val) => {
        let money = limit(val.substring(0, 3), '999', true)

        vendLimit.current.value = money
        return "$" + money
    }

    let completedOrders = 0

    console.log("completeorders", completeOrders)

    completeOrders.map(order => {
        completedOrders += 1
    })

    let component = []
    if (completeOrders.length === 0) {
      component = <h2>Your Store Has No Order History</h2>
    }
    else {
      component = completeOrders.map(order => {
        return <OrderHistory order={order} key={order.id}></OrderHistory>
      })
    }

    return(
      <>
          <section className="store-profile">
            <div className="edit-form">
              <h1>{setting.store_name} Profile</h1>
              <h4>Vend Time Range:</h4>
              <div className="time-range">
                <fieldset className="time-inline">
                    <label htmlFor="startTime"> Start Time </label>
                    {/* <input ref={startTime} type="text"
                        name="startTime"
                        className="form-control"
                        placeholder={setting.start_time}
                    /> */}
                    <NumberFormat ref={startTime}
                        name="startTime"
                        className="form-control"
                        placeholder={setting.start_time} format={starttimeMax} mask="_"/>
                </fieldset>
                  <hr className="line"></hr>
                <fieldset className="time-inline">
                    <label htmlFor="endTime"> End Time </label>
                    <NumberFormat ref={endTime}
                        name="endTime"
                        className="form-control"
                        placeholder={setting.end_time} format={endtimeMax} mask="_"/>
                </fieldset>
              </div>
              <h4>Vend Limit:</h4>
              <div className="vend-amount">
                <NumberFormat placeholder={"$" + setting.vend_limit} ref={vendLimit} className="form-vend" thousandSeparator={true} format={moneyMax} />
              </div>
              <button className="change-settings" onClick={changeSettings}>Submit Changes</button>
            </div>
            <div className="add-line"></div>
            <div className="incoming">
              <h4>Complete Orders: {completedOrders}</h4>
              {
                component
              }
            </div>
          </section>
      </>
    )
  }

export default StoreProfile