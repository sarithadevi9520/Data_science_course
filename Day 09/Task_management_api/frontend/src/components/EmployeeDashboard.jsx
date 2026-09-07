import { useState } from "react"
import Employees from "../pages/Employees"
import "./EmployeeDashboard.css"

function EmployeeDashboard({ setLoggedIn }) {
  const [statusFilter, setStatusFilter] = useState("All")

  function handleLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("accessType")
    setLoggedIn(false)
  }

  return (
    <div className="employee-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="employee-sidebar">

        {/* BRAND */}
        <div className="sidebar-brand">

          <div className="sidebar-logo">
            MF
          </div>

          <div>
            <h2>MANAGE FLOW</h2>
            <span>Management Platform</span>
          </div>

        </div>


        {/* NAVIGATION */}
        <nav className="sidebar-nav">

          <div className="nav-section-title">
            MANAGEMENT
          </div>


          {/* EMPLOYEE DASHBOARD */}
          <button
            className={`nav-item ${
              statusFilter === "All" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("All")}
          >
            <span>▣</span>
            <span>Employee Dashboard</span>
          </button>


          {/* ACTIVE EMPLOYEES */}
          <button
            className={`nav-item ${
              statusFilter === "Active" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("Active")}
          >
            <span>✓</span>
            <span>Active Employees</span>
          </button>


          {/* TERMINATED EMPLOYEES */}
          <button
            className={`nav-item ${
              statusFilter === "Terminated" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("Terminated")}
          >
            <span>✕</span>
            <span>Terminated Employees</span>
          </button>


          {/* ON LEAVE EMPLOYEES */}
          <button
            className={`nav-item ${
              statusFilter === "On Leave" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("On Leave")}
          >
            <span>🕐</span>
            <span>On Leave Employees</span>
          </button>

        </nav>


        {/* LOGOUT */}
        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          <span>Logout</span>
        </button>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="employee-main">

        {/* HEADER */}
        <header className="employee-header">

          <div>

            <div className="page-label">
              WORKFORCE MANAGEMENT
            </div>

            <h1>
              Employee Management
            </h1>

            <p>
              Manage employee records and workforce information.
            </p>

          </div>


          {/* USER PROFILE */}
          <div className="user-profile">

            <div className="user-avatar">
              {(localStorage.getItem("username") || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div>

              <strong>
                {localStorage.getItem("username") || "User"}
              </strong>

              <span>
                Administrator
              </span>

            </div>

          </div>

        </header>


        {/* EMPLOYEE PAGE */}
        <Employees statusFilter={statusFilter} />

      </main>

    </div>
  )
}

export default EmployeeDashboard