import React, { useEffect, useState, useRef } from "react"
import "./Store.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import IncomingOrders from "../incoming/IncomingOrders"

const Store = props => {
    const [setting, setSettings] = useState([])
    const [store, setStore] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getSettings = () => {
        fetch(`http://192.168.20.138:8000/stores?merchant=${localStorage.getItem("id")}`, {
            "method": "GET",
            "headers": {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": `Token ${localStorage.getItem("bangazon_token")}`
            }
        })
        .then(response => response.json())
        .then(setSettings)
      }


    useEffect(getSettings, [])

    let thing = 20
    return(
      <>
          <section className="store-page">
            <div className="dashboard">
              <h1>Store Page</h1>
              <div className="progress">
                <div className="progress-bar" role="progressbar" style={{width: thing + "%"}}></div>
              </div>
              {
                console.log("snee?", setting),
                setting.map(set => {
                  return <h4 key={set.id}>${set.vend_limit}</h4>
                })
              }
            </div>
            <div className="add-line">line</div>
            <div className="incoming">
                {/* <IncomingOrders></IncomingOrders> */}
            </div>
          </section>
      </>
    )
  }

export default Store