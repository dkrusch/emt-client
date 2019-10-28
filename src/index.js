import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import BangazonBuilder from './components/emt.js'

ReactDOM.render(
  <Router>
      <BangazonBuilder />
  </Router>
  , document.getElementById('root'))