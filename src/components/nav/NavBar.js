import React from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// Author: Danny & Dustin (Changed elements of Nav)
// Purpose: Display Nav bar with functional links for clientside

const NavBar = props => {
    const { isAuthenticated, logout } = useSimpleAuth()

    return (
        <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
            <ul className="nav nav-pills nav-fill">

                {
                    isAuthenticated() ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mystore">My Store</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/storesettings">Store Settings</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reports">Reports</Link>
                        </li>

                        <li className="nav-item">
                            <button className="nav-link fakeLink"
                                onClick={() => {
                                    logout()
                                    props.history.push({
                                        pathname: "/"
                                    })
                                }
                                }
                            >Logout</button>
                        </li>
                        </> :
                        <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                        </>
                }
            </ul>
        </nav>
    )
}

export default NavBar
