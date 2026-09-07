import { useEffect, useState } from "react"
import EmployeeForm from "../components/EmployeeForm"
import EmployeeTable from "../components/EmployeeTable"

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../services/employeeApi"

import "./Employees.css"


function Employees({ statusFilter }) {

  const [employees, setEmployees] = useState([])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState("")
  const [showForm, setShowForm] = useState(false)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")


  // ================= LOAD EMPLOYEES =================

  async function loadEmployees(searchValue = search) {

    try {

      setLoading(true)
      setError("")

      const response = await getEmployees(searchValue)

      setEmployees(response.data)

    } catch (error) {

      console.error("Error loading employees:", error)

      setError(
        error.response?.data?.detail ||
        "Unable to load employees"
      )

    } finally {

      setLoading(false)

    }
  }


  // ================= INITIAL LOAD =================

  useEffect(() => {

    loadEmployees("")

  }, [])


  // ================= SEARCH =================

  function handleSearch(event) {

    const value = event.target.value

    setSearch(value)

    loadEmployees(value)
  }


  // ================= ADD FORM =================

  function openAddForm() {

    setSelected(null)

    setShowForm(true)

    setMessage("")
    setError("")
  }


  // ================= EDIT FORM =================

  function openEditForm(employee) {

    setSelected(employee)

    setShowForm(true)

    setMessage("")
    setError("")
  }


  // ================= SAVE EMPLOYEE =================

  async function saveEmployee(data) {

    try {

      setError("")
      setMessage("")


      if (selected) {

        await updateEmployee(
          selected.id,
          data
        )

        setMessage(
          "Employee updated successfully."
        )

      } else {

        await createEmployee(data)

        setMessage(
          "Employee added successfully."
        )
      }


      setSelected(null)

      setShowForm(false)

      await loadEmployees()

    } catch (error) {

      console.error(
        "Error saving employee:",
        error
      )

      setError(
        error.response?.data?.detail ||
        "Unable to save employee"
      )
    }
  }


  // ================= DELETE EMPLOYEE =================

  async function removeEmployee(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    )

    if (!confirmed) {
      return
    }


    try {

      setError("")
      setMessage("")

      await deleteEmployee(id)

      setMessage(
        "Employee deleted successfully."
      )

      await loadEmployees()

    } catch (error) {

      console.error(
        "Error deleting employee:",
        error
      )

      setError(
        error.response?.data?.detail ||
        "Unable to delete employee"
      )
    }
  }


  // ================= STATISTICS =================

  const totalEmployees = employees.length


  const activeEmployees = employees.filter(
    employee =>
      employee.status === "Active"
  ).length


  const terminatedEmployees = employees.filter(
    employee =>
      employee.status === "Terminated"
  ).length


  const onLeaveEmployees = employees.filter(
    employee =>
      employee.status === "On Leave"
  ).length


  // ================= STATUS FILTER =================

  const filteredEmployees =
    statusFilter === "All"
      ? employees
      : employees.filter(
          employee =>
            employee.status === statusFilter
        )


  // ================= DISPLAY =================

  return (

    <div className="employees-page">


      {/* ========================================= */}
      {/* EMPLOYEE STATISTICS */}
      {/* ========================================= */}

      <div className="employee-stats">


        {/* TOTAL */}
        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>

            <span>
              Total Employees
            </span>

            <strong>
              {totalEmployees}
            </strong>

          </div>

        </div>


        {/* ACTIVE */}
        <div className="stat-card">

          <div className="stat-icon">
            ✓
          </div>

          <div>

            <span>
              Active Employees
            </span>

            <strong>
              {activeEmployees}
            </strong>

          </div>

        </div>


        {/* TERMINATED */}
        <div className="stat-card">

          <div className="stat-icon">
            ✕
          </div>

          <div>

            <span>
              Terminated Employees
            </span>

            <strong>
              {terminatedEmployees}
            </strong>

          </div>

        </div>


        {/* ON LEAVE */}
        <div className="stat-card">

          <div className="stat-icon">
            🕐
          </div>

          <div>

            <span>
              On Leave Employees
            </span>

            <strong>
              {onLeaveEmployees}
            </strong>

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* SEARCH + ADD BUTTON */}
      {/* ========================================= */}

      <div className="employee-toolbar">


        {/* SEARCH */}
        <div className="search-box">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search by name, email, department or role..."
            value={search}
            onChange={handleSearch}
          />


          {search && (

            <button
              className="clear-search"
              onClick={() => {

                setSearch("")

                loadEmployees("")

              }}
            >
              ×
            </button>

          )}

        </div>


        {/* ADD EMPLOYEE */}
        <button
          className="add-employee-button"
          onClick={openAddForm}
        >

          <span>
            +
          </span>

          Add Employee

        </button>

      </div>


      {/* ========================================= */}
      {/* SUCCESS MESSAGE */}
      {/* ========================================= */}

      {message && (

        <div className="success-message">
          ✓ {message}
        </div>

      )}


      {/* ========================================= */}
      {/* ERROR MESSAGE */}
      {/* ========================================= */}

      {error && (

        <div className="error-message">
          ⚠ {error}
        </div>

      )}


      {/* ========================================= */}
      {/* EMPLOYEE TABLE */}
      {/* ========================================= */}

      <section className="employee-table-card">


        {/* TABLE HEADER */}
        <div className="table-heading">

          <div>

            <h2>
              {statusFilter === "All"
                ? "Employee Records"
                : `${statusFilter} Employees`}
            </h2>


            <p>

              {loading

                ? "Loading employees..."

                : `${filteredEmployees.length} employee${
                    filteredEmployees.length !== 1
                      ? "s"
                      : ""
                  } found`

              }

            </p>

          </div>

        </div>


        {/* LOADING */}
        {loading ? (

          <div className="table-empty">

            <div className="loading-spinner"></div>

            <p>
              Loading employees...
            </p>

          </div>


        ) : filteredEmployees.length === 0 ? (

          /* NO EMPLOYEES */
          <div className="table-empty">

            <div className="empty-icon">
              👥
            </div>

            <h3>
              No employees found
            </h3>

            <p>
              {statusFilter === "All"
                ? "Add an employee or change your search."
                : `There are no ${statusFilter.toLowerCase()} employees.`}
            </p>

          </div>


        ) : (

          /* TABLE */
          <EmployeeTable
            employees={filteredEmployees}
            onEdit={openEditForm}
            onDelete={removeEmployee}
          />

        )}

      </section>


      {/* ========================================= */}
      {/* ADD / EDIT MODAL */}
      {/* ========================================= */}

      {showForm && (

        <div
          className="modal-overlay"
          onClick={() => setShowForm(false)}
        >


          <div
            className="employee-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* MODAL HEADER */}
            <div className="modal-header">

              <div>

                <h2>
                  {selected
                    ? "Edit Employee"
                    : "Add Employee"}
                </h2>


                <p>
                  {selected
                    ? "Update employee information"
                    : "Enter employee information"}
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowForm(false)
                }
              >
                ×
              </button>

            </div>


            {/* FORM */}
            <EmployeeForm
              selected={selected}
              onSave={saveEmployee}
              onCancel={() =>
                setShowForm(false)
              }
            />

          </div>

        </div>

      )}

    </div>
  )
}


export default Employees