import React, { useEffect, useState, useRef } from "react"
// import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
// import IncomingOrders from "./incoming/IncomingOrders"

const IncomingOrders = props => {
    // useEffect(getOrders, [])
    const completeOrder = () => {
        fetch(`http://192.168.21.117:8000/orders/${props.id}`, {
          "method": "PUT",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          },
          "body": JSON.stringify({
            "time_complete": new Date().toISOString()
          })
        })
        .then(() => props.getOpenOrders())
        .then(() => props.getCompleteOrders())
    }

    console.log("key", props.id)
    console.log("date", new Date().toISOString())
    return(
      <>
          <section className="incoming-orders">
            <div>{props.order.customer.full_name}</div>
            <div>${props.order.vend_amount}</div>
            <div>In ${props.order.denomination} bills</div>
            <button type="submit" onClick={() => completeOrder()}>Complete Order</button>
          </section>
      </>
    )
  }

export default IncomingOrders