import React, { useEffect, useState, useRef} from "react"
// import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import { Link } from "react-router-dom"

const PaymentItem = props => {
    const deletePayment = () => {
        fetch(`http://192.168.1.4:8000/payments/${props.payment.id}`, {
            "method": "DELETE",
            "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(() => props.getPayments())
    }


    return(
      <>
          <section className="incoming-orders">
            <div className="payment-details">
                <div>{props.payment.merchant_name}</div>
                <div>{props.payment.account_number}</div>
                <div>{props.payment.expiration_date}</div>
            </div>
            <div className="buttons">
                <Link className="nav-link nav-color" to={`/editpayment/${props.payment.id}`}>
                    <div key={props.payment.id}>Edit</div>
                </Link>
                <button key={props.payment.id} onClick={deletePayment}>Delete</button>
            </div>
            <hr></hr>
          </section>
      </>
    )
  }

export default PaymentItem