import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import NumberFormat from 'react-number-format';
import PaymentItem from './PaymentItem'
import "./Payment.css"
import { Link } from "react-router-dom"


const PaymentList = props => {

    useEffect(() => {
        props.getPaymentList()
    }, [])

    return(
      <>
          <section className="payment=list">
            <Link className="nav-link nav-color" to={`/addpayment`}>
                <div>Add Payment</div>
            </Link>
            <div className="confirm-payment">
                {
                    props.paymentList.map(payment => {
                        return <PaymentItem payment={payment} getPayments={props.getPaymentList}></PaymentItem>
                    })
                }
            </div>
          </section>
      </>
    )
  }

export default PaymentList