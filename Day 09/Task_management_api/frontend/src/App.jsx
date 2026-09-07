import { useState } from "react"

import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"
import EmployeeDashboard from "./components/EmployeeDashboard"


function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") !== null
  )

  const [showRegister, setShowRegister] = useState(false)


  // Get which system the user selected
  const accessType = localStorage.getItem("accessType")


  // =====================================================
  // LOGGED-IN USER
  // =====================================================

  if (loggedIn) {

    // Employee Management
    if (accessType === "employee") {

      return (
        <EmployeeDashboard
          setLoggedIn={setLoggedIn}
        />
      )
    }


    // Task Management
    return (
      <Dashboard
        setLoggedIn={setLoggedIn}
      />
    )
  }


  // =====================================================
  // REGISTER PAGE
  // =====================================================

  if (showRegister) {

    return (
      <Register
        setShowRegister={setShowRegister}
      />
    )
  }


  // =====================================================
  // LOGIN PAGE
  // =====================================================

  return (
    <Login
      setLoggedIn={setLoggedIn}
      setShowRegister={setShowRegister}
    />
  )
}


export default App