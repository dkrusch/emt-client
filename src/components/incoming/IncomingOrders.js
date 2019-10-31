import React, { useEffect, useState, useRef } from "react"
// import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
// import IncomingOrders from "./incoming/IncomingOrders"

const IncomingOrders = props => {
    const [incomingOrders, setOrders] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getOrders = () => {
        fetch(`http://192.168.20.138:8000/orders`, {
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


    useEffect(getOrders, [])

    let thing = 20
    return(
      <>
          <section className="incoming-orders">
              <ul className="order-column">
              {
                incomingOrders.map(order => {
                  {console.log("byeeee", order)}
                  return (
                    <div key={order.id}>
                        <h4>{order.customer.full_name}</h4>
                        <h4>${order.vend_amount}</h4>
                        <hr></hr>
                    </div>
                  )
                })
              }
              </ul>
          </section>
      </>
    )
  }

export default IncomingOrders