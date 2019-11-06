import React, { useEffect, useState, useRef } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "bootstrap/dist/css/bootstrap.min.css"
import NumberFormat from 'react-number-format';
import PaymentItem from './PaymentItem'
import "./Payment.css"
import { Link } from "react-router-dom"


const PaymentList = props => {
    const [payments, setPayments] = useState([])

    const formatDate = (date) => {
        let splitDate = date.split("/")
        return "20" + splitDate[1] + "-" + splitDate[0] + "-01"
    }

    const getPayments = () => {
      fetch(`http://192.168.1.4:8000/payments?customer=${localStorage.getItem("id")}`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(response => {
          setPayments(response)
      })
    }

    useEffect(() => {
        getPayments()
    }, [])

    return(
      <>
          <section className="payment=list">
            <Link className="nav-link nav-color" to={`/addpayment`}>
                <div>Add Payment</div>
            </Link>
            <div className="confirm-payment">
                {
                    payments.map(payment => {
                        return <PaymentItem payment={payment}></PaymentItem>
                    })
                }
            </div>
          </section>
      </>
    )
  }

export default PaymentList