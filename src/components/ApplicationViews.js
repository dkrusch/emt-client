import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Store from "./store/Store"
import Stores from "./stores/Stores"
import Payment from "./payment/Payment"
import CreateOrder from "./create-order/CreateOrder"
import StoreProfile from "./store-profile/StoreProfile"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"



const ApplicationViews = () => {
    const [stores, setStores] = useState([])
    const {isAuthenticated} = useSimpleAuth()

    const getStores = () => {
      fetch(`http://192.168.1.4:8000/stores`, {
          "method": "GET",
          "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
          }
      })
      .then(response => response.json())
      .then(setStores)
    }

    useEffect(() => {
        getStores()
    }, [])

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
                exact path="/stores" render={props => {
                    return <Stores {...props} />
                }}
            />

            <Route
                exact path="/payment" render={props => {
                    return <Payment {...props} />
                }}
            />

            <Route
                exact path="/createorder/:storeId(\d+)" render={props => {
                    let store = stores.find(store => store.id === +props.match.params.storeId)

                    if (store) {
                        return <CreateOrder {...props} store={store} />
                    }
                }}
            />

            <Route
                exact path="/register" render={props => {
                    return <Register {...props} />
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

export default withRouter(ApplicationViews)