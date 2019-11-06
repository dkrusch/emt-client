import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Register.css"
import { Link } from "react-router-dom"


const Register = props => {

    return (
        <main style={{ textAlign: "center" }}>
            <div className="register-links">
                <Link className="nav-link" to="/registercustomer">Register As Customer</Link>
                <Link className="nav-link" to="/registermerchant">Register As Merchant</Link>
            </div>
        </main>
    )
}
export default withRouter(Register)