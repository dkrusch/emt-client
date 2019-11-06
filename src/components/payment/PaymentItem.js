import React, { useEffect, useState, useRef} from "react"
// import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"

const PaymentItem = props => {
    return(
      <>
          <section className="incoming-orders">
            <div>{props.payment.merchant_name}</div>
            <div>{props.payment.account_number}</div>
            <div>{props.payment.expiration_date}</div>
            <div className="buttons">
                <Link className="nav-link nav-color" to={`/editpayment/${props.payment.id}`}>
                    <div key={props.payment.id}>Edit</div>
                </Link>
                <button key={props.payment.id}>Delete</button>
            </div>
            <hr></hr>
          </section>
      </>
    )
  }

export default PaymentItem