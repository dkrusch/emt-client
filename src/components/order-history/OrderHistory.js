import React, { useEffect, useState, useRef } from "react"
import "./OrderHistory.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
// import IncomingOrders from "./incoming/IncomingOrders"

const OrderHistory = props => {
    return(
      <>
          <section className="incoming-orders">
            <div>{props.order.customer.full_name}</div>
            <div>${props.order.vend_amount}</div>
            <div>In ${props.order.denomination} bills</div>
            <div>On {props.order.time_complete.substring(0, 10)}</div>
            <hr></hr>
          </section>
      </>
    )
  }

export default OrderHistory