import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import RegisterCustomer from "./auth/RegisterCustomer"
import RegisterMerchant from "./auth/RegisterMerchant"
import Login from "./auth/Login"
import Store from "./store/Store"
import Stores from "./stores/Stores"
import Payment from "./payment/Payment"
import PaymentList from "./payment/PaymentList"
import EditPayment from "./payment/EditPayment"
import CreateOrder from "./create-order/CreateOrder"
import StoreProfile from "./store-profile/StoreProfile"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"



const ApplicationViews = () => {
    const [stores, setStores] = useState([])
    const [payments, setPayments] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    const [paymentlist, setPaymentList] = useState([])

    const getPaymentList = () => {
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
          setPaymentList(response)
      })
    }


    if (localStorage.getItem("is_merchant") === "true") {
        return (
            <React.Fragment>

                <Route
                    exact path="/mystore" render={props => {
                        return <Store {...props} />
                    }}
                />

                <Route
                    exact path="/storesettings" render={props => {
                        return <StoreProfile {...props} />
                    }}
                />

                <Route
                    exact path="/register" render={props => {
                        return <Register {...props} />
                    }}
                />

                <Route
                    exact path="/registercustomer" render={props => {
                        return <RegisterCustomer {...props} />
                    }}
                />

                <Route
                    exact path="/registermerchant" render={props => {
                        return <RegisterMerchant {...props} />
                    }}
                />

                <Route
                    exact path="/login" render={props => {
                        return <Login {...props} />
                    }}
                />

            </React.Fragment>
        )
    }

    else
    {
        return (
            <React.Fragment>

                <Route
                    exact path="/stores" render={props => {
                        return <Stores {...props} />
                    }}
                />

                <Route
                    exact path="/payment" render={props => {
                        return <PaymentList {...props} paymentList={paymentlist} getPaymentList={getPaymentList} />
                    }}
                />

                <Route
                    exact path="/addpayment" render={props => {
                        return <Payment {...props} getPaymentList={getPaymentList} />
                    }}
                />

                <Route
                    exact path="/editpayment/:paymentId(\d+)" render={props => {
                            return <EditPayment {...props} paymentId={+props.match.params.paymentId} getPaymentList={getPaymentList} />
                    }}
                />

                <Route
                    exact path="/createorder/:storeId(\d+)" render={props => {
                            return <CreateOrder {...props} storeId={+props.match.params.storeId} />
                    }}
                />

                <Route
                    exact path="/register" render={props => {
                        return <Register {...props} />
                    }}
                />

                <Route
                    exact path="/registercustomer" render={props => {
                        return <RegisterCustomer {...props} />
                    }}
                />

                <Route
                    exact path="/registermerchant" render={props => {
                        return <RegisterMerchant {...props} />
                    }}
                />

                <Route
                    exact path="/login" render={props => {
                        return <Login {...props} />
                    }}
                />

            </React.Fragment>
        )
    }
}

export default withRouter(ApplicationViews)