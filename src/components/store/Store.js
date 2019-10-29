import React, { useEffect, useState, useRef } from "react"
import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

//Author: Tyler Carpenter
//Purpose: Home Page will show the 20 most recent items added to sell by users
//Methods: getQuantity by specified number.

//Author: Dustin Hobson
//Purpose: Search functionality of products by city
//Methods: Get products by location query

const Store = props => {
    const [setting, setSettings] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()





    const getSettings = () => {
        fetch(`http://192.168.20.138:8000/products?quantity=20`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
            }
        })
        .then(response => response.json())
        .then(setSettings)
      }


    useEffect(getSettings, [])

      return(
        <>
          <h1> WELCOME TO EMT</h1>
        </>
    )
  }



export default Store