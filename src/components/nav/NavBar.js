import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import "../auth/Welcome.css"

// Author: Danny & Dustin (Changed elements of Nav)
// Purpose: Display Nav bar with functional links for clientside

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()


    if (isAuthenticated())
    {
        if (localStorage.getItem("is_merchant") === "true")
        {
            return (
                <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                    <ul className="nav nav-pills nav-fill nav-space">

                        {
                            <>
                                <div className="link-group">
                                    <li className="nav-item">
                                        <Link className="nav-link nav-color" to="/mystore">My Store</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link nav-color" to="/storesettings">Store Settings</Link>
                                    </li>
                                </div>

                                <div>
                                    <li className="nav-item">
                                        <button className="nav-link fakeLink logout"
                                            onClick={() => {
                                                logout()
                                                props.history.push({
                                                    pathname: "/"
                                                })
                                            }
                                            }
                                        >Logout</button>
                                    </li>
                                </div>


                            </>
                        }
                    </ul>
                </nav>
            )
        }
        else
        {
            return (
                <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                    <ul className="nav nav-pills nav-fill nav-space">
                        {
                            <>
                                <div className="link-group">
                                    <li className="nav-item">
                                        <Link className="nav-link nav-color" to="/stores">Stores</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link className="nav-link nav-color" to="/payment">Payment Settings</Link>
                                    </li>
                                </div>

                                <div className="logout-group">
                                    <li className="nav-item">
                                        <button className="nav-link fakeLink logout"
                                            onClick={() => {
                                                logout()
                                                props.history.push({
                                                    pathname: "/"
                                                })
                                            }
                                            }
                                        >Logout</button>
                                    </li>
                                </div>


                                </>
                        }
                    </ul>
                </nav>
            )
        }
    }
    else
    {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">

                    {
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link nav-color" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-color" to="/register">Register</Link>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        )
    }
}

export default NavBar
