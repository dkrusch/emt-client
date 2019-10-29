import { Route } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter, Redirect } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
// import ProductDetail from "./products/ProductDetail"
// import ProductCategories from "./productcategories/ProductCategories"
// import ProductCategory  from "./productcategories/ProductCategory"
import Store from "./store/Store"
// import PaymentTypeForm from "./paymentmethod/PaymentTypeForm"
// import ProductForm from "./products/ProductForm"
// import PaymentTypes from "./paymentmethod/PaymentTypes"
// import CardOrder from "./cart/CartOrder"
// import MyProfile from "./profile/MyProfile"
// import OrderHistory from "./profile/OrderHistory"
// import OrderDetail from "./profile/OrderDetail"
// import MyProducts from "./products/MyProducts"
// import MyProfileEditForm from "./profile/MyProfileEditForm"
// import Favorites from "./favorites/favorites"
// import CompleteOrder from "./cart/CompleteOrder"
// import IncompleteOrders from "./reports/IncompleteOrders"
// import Reports from "./reports/Reports"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"



const ApplicationViews = () => {
    // Fetches all products and categories to be used in product categories and product details pages
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [orders, setOrders] = useState([])
    const [completeOrders, setCompleteOrders] = useState([])
    const { isAuthenticated } = useSimpleAuth()
    const [myRatings, setMyRatings] = useState([])
    const [recommendations, setRecommendations] = useState([])



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