import React, { useEffect, useState, useRef } from "react"
import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import IncomingOrders from "../incoming/IncomingOrders"

const Store = props => {
    const [setting, setSettings] = useState({})
    const [orders, setOrders] = useState([])
    const [completeOrders, setCompleteOrders] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getSettings = () => {
      fetch(`http://192.168.20.138:8000/stores?merchant=${localStorage.getItem("id")}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(response => setSettings(response[0]))
    }

    const getOpenOrders = () => {
      fetch(`http://192.168.20.138:8000/orders?$merchant=${localStorage.getItem("id")}&complete=0`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(setOrders)
    }

    const getCompleteOrders = () => {
      fetch(`http://192.168.20.138:8000/orders?merchant=1&complete=1`, {
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
      getOpenOrders()
      getCompleteOrders()
    }, [])

    let vendPercent = 100

    let checkDate = new Date()
    let earned = 0
    let vended = 0

    console.log("completeorders", completeOrders)

    completeOrders.map(order => {
      console.log("hello", checkDate.toISOString().substring(0, 10), order.time_complete.substring(0, 10))
      if (checkDate.toISOString().substring(0, 10) === order.time_complete.substring(0, 10))
      {
        vended += order.vend_amount
        vendPercent = vendPercent - (vendPercent * (vended / vendPercent))
        earned += 1
      }
    })

    let component = []
    if (orders.length === 0) {
      component = <h2>No incoming orders</h2>
    }
    else {
      component = orders.map(order => {
        {console.log("order", order)}
        return <IncomingOrders order={order} key={order.id} getOpenOrders={getOpenOrders} getCompleteOrders={getCompleteOrders} id={order.id}></IncomingOrders>
      })
    }

    return(
      <>
          <section className="store-page">
            <div className="dashboard">
              <h1>{console.log("bye", setting)}{setting.store_name} Dashboard</h1>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: vendPercent + "%"}}></div>
              </div>
              <h4>Vend limit ${setting.vend_limit}</h4>
              <h4>Amount Vended ${vended}</h4>
              <h4>Amount Earned ${earned}</h4>
            </div>
            <div className="add-line"></div>
            {console.log("orders", orders)}
            <div className="incoming">
              {
                component
              }
            </div>
          </section>
      </>
    )
  }

export default Store