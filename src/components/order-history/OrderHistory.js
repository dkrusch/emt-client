import React, { useEffect, useState, useRef } from "react"
// import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
// import IncomingOrders from "./incoming/IncomingOrders"

const OrderHistory = props => {

    console.log("key", props.id)
    console.log("date", new Date().toISOString())
    let thing = 20
    return(
      <>
          <section className="incoming-orders">
            <div>{props.order.customer.full_name}</div>
            <div>${props.order.vend_amount}</div>
            <div>In ${props.order.denomination} bills</div>
            <hr></hr>
          </section>
      </>
    )
  }

export default OrderHistory