import React, { useEffect, useState, useRef} from "react"
// import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"
// import StoreLink from "./incoming/StoreLink"

const StoreLink = props => {
    // useEffect(getOrders, [])
    // const createOrder = () => {
    //     fetch(`http://192.168.1.4:8000/orders`, {
    //         "method": "POST",
    //         "headers": {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
    //         },
    //         "body": JSON.stringify({
    //             "start_time": startTime.current.value,
    //             "end_time": endTime.current.value,
    //             "vend_limit": vendLimit.current.value
    //         })
    //     })
    //     .then(() => getSettings())
    // }

    let address = 0

    console.log("?", props.store.address_line_two === null)
    if (props.store.address_line_two === null) {
        address = <div>{props.store.address_line_one}</div>
    }
    else {
        address = <div>{props.store.address_line_one}, {props.store.address_line_two}</div>
    }

    console.log("key", props)
    return(
      <>
          <section className="incoming-orders">
            <div>{props.store.store_name}</div>
            <div>{address}</div>
            <Link className="nav-link nav-color" to="/createorder"><button type="submit">Create Order</button></Link>
            <hr></hr>
          </section>
      </>
    )
  }

export default StoreLink