import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import Store from "./store/Store"
import StoreProfile from "./store-profile/StoreProfile"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"



const ApplicationViews = () => {
    // Fetches all products and categories to be used in product categories and product details pages
    const { isAuthenticated } = useSimpleAuth()



    // Runs both fetches in sequence when application starts
    // useEffect(() => {
    //     getProducts()
    //     getCategories()
    //     getOrders()
    //     getCompleteOrders()
    //     getRecommendations()
    // }, [])

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
                exact path="/login" render={props => {
                    return <Login {...props} />
                }}
            />

        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)