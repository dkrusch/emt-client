import React, { useEffect, useState, useRef } from "react"
import "./Stores.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { valueToNode } from "@babel/types"
import "bootstrap/dist/css/bootstrap.min.css"
import StoreLink from "./StoreLink"
import NumberFormat from 'react-number-format';


const Stores = props => {
    const [stores, setStores] = useState([])
    const {isAuthenticated} = useSimpleAuth()
    // const searchTerm = useRef()

    const getStores = () => {
      fetch(`http://192.168.21.117:8000/stores`, {
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

    console.log("stores", stores)

    let component = []
    if (stores.length === 0) {
      component = <h2>No stores near you</h2>
    }
    else {
      component = stores.map(store => {
        return <StoreLink store={store} key={store.id}></StoreLink>
      })
    }

    console.log(stores)

    return(
      <>
          <section className="store-list">
            <div className="incoming">
              <h4 className="number-of-stores">Stores: {stores.length}</h4>
              {
                component
              }
            </div>
          </section>
      </>
    )
  }

export default Stores