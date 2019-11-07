import React, { useRef } from "react"
import { withRouter } from "react-router-dom"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "./Register.css"


const RegisterMerchant = props => {
    const email = useRef()
    const userName = useRef()
    const lastName = useRef()
    const password = useRef()
    const firstName = useRef()
    const phone = useRef()
    const address = useRef()
    const verifyPassword = useRef()
    const storeName = useRef()
    const addressLineOne = useRef()
    const addressLineTwo = useRef()
    const zipCode = useRef()
    const description = useRef()
    const startTime = useRef()
    const endTime = useRef()
    const vendLimit = useRef()
    const { register } = useSimpleAuth()

    const registerStore = () => {
        console.log("local", localStorage)
        fetch(`http://192.168.1.4:8000/stores`, {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            },
            "body": JSON.stringify({
                "merchant_id": localStorage.getItem("id"),
                "store_name": storeName.current.value,
                "address_line_one": addressLineOne.current.value,
                "address_line_two": addressLineTwo.current.value,
                "zip_code": zipCode.current.value,
                "description": description.current.value,
                "created_date": new Date(),
                "start_time": startTime.current.value,
                "end_time": endTime.current.value,
                "vend_limit": vendLimit.current.value
            })
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        const newUser = {
            "username": userName.current.value,
            "first_name": firstName.current.value,
            "last_name": lastName.current.value,
            "phone_number": phone.current.value,
            "address": address.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "is_merchant": true
        }

        register(newUser).then(() => {
            registerStore()
            props.history.push({
                pathname: "/mystore"
            })
        })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register to use ETM as a merchant</h1>
                <fieldset>
                    <label htmlFor="userName"> Username </label>
                    <input ref={userName} type="text"
                        name="userName"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPhone"> Phone Number </label>
                    <input ref={phone} type="text"
                        name="phone"
                        className="form-control"
                        placeholder="000-000-0000"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputAddress"> Address </label>
                    <input ref={address} type="text"
                        name="address"
                        className="form-control"
                        placeholder="Address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="storeName"> Store Name </label>
                    <input ref={storeName} type="text"
                        name="storeName"
                        className="form-control"
                        placeholder="Store name"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressLineOne"> Address Line 1 </label>
                    <input ref={addressLineOne} type="text"
                        name="addressLineOne"
                        className="form-control"
                        placeholder="Address line one"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="addressLineTwo"> Address Line 2 </label>
                    <input ref={addressLineTwo} type="text"
                        name="addressLineTwo"
                        className="form-control"
                        placeholder="Address line two"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="zipCode"> Zip Code </label>
                    <input ref={zipCode} type="text"
                        name="zipCode"
                        className="form-control"
                        placeholder="Zip Code"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="description"> Description </label>
                    <input ref={description} type="description"
                        name="description"
                        className="form-control"
                        placeholder="Description"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="startTime"> Start Time </label>
                    <input ref={startTime} type="text"
                        name="startTime"
                        className="form-control"
                        placeholder="Start Time"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="endTime"> End Time </label>
                    <input ref={endTime} type="text"
                        name="endTime"
                        className="form-control"
                        placeholder="End Time"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="vendLimit"> Vend Limit </label>
                    <input ref={vendLimit} type="text"
                        name="vendLimit"
                        className="form-control"
                        placeholder="Vend Limit"
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}
export default withRouter(RegisterMerchant)