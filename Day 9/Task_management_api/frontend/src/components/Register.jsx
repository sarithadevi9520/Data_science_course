import { useState } from "react"
import "./Register.css"

function Register({ setShowRegister }) {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [accessType, setAccessType] = useState("task")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")


  async function handleRegister(event) {

    event.preventDefault()

    setError("")
    setSuccess("")
    setLoading(true)

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            access_type: accessType
          })
        }
      )


      const data = await response.json()


      if (response.ok) {

        setSuccess(
          "Account created successfully. You can now sign in."
        )

        setUsername("")
        setEmail("")
        setPassword("")
        setAccessType("task")

      } else {

        setError(
          data.detail || "Unable to create account"
        )
      }

    } catch (error) {

      console.error("Registration error:", error)

      setError(
        "Could not connect to server"
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <div className="register-page">

      {/* ==================================================
          LEFT SIDE
      ================================================== */}

      <div className="register-left">

        <div className="register-left-content">

          {/* BRAND */}

          <div className="register-brand">

            <div className="register-logo">
              MF
            </div>

            <div>

              <h2>
                MANAGEFLOW
              </h2>

              <span>
                Unified Management Platform
              </span>

            </div>

          </div>


          {/* INTRO */}

          <div className="register-intro">

            <span className="register-eyebrow">
              CREATE YOUR WORKSPACE
            </span>

            <h1>
              One platform.
              <br />
              <span>Two ways to manage.</span>
            </h1>

            <p>
              Choose the management system that fits
              your work and create your account to get started.
            </p>

          </div>


          {/* SYSTEM CARDS */}

          <div className="register-systems">

            {/* TASK MANAGEMENT */}

            <div
              className={`register-system ${
                accessType === "task"
                  ? "selected-task"
                  : ""
              }`}
              onClick={() =>
                setAccessType("task")
              }
            >

              <div className="system-icon task-icon">
                ✓
              </div>

              <div className="system-content">

                <div className="system-title-row">

                  <h3>
                    Task Management
                  </h3>

                  {accessType === "task" && (
                    <span className="selected-label">
                      SELECTED
                    </span>
                  )}

                </div>

                <p>
                  Create, organize and track
                  your tasks and productivity.
                </p>

              </div>

            </div>


            {/* EMPLOYEE MANAGEMENT */}

            <div
              className={`register-system ${
                accessType === "employee"
                  ? "selected-employee"
                  : ""
              }`}
              onClick={() =>
                setAccessType("employee")
              }
            >

              <div className="system-icon employee-icon">
                +
              </div>

              <div className="system-content">

                <div className="system-title-row">

                  <h3>
                    Employee Management
                  </h3>

                  {accessType === "employee" && (
                    <span className="selected-label employee-selected-label">
                      SELECTED
                    </span>
                  )}

                </div>

                <p>
                  Manage employee records,
                  information and workforce data.
                </p>

              </div>

            </div>

          </div>


          {/* BOTTOM MESSAGE */}

          <div className="register-bottom">

            <div className="bottom-line"></div>

            <p>
              One platform. Two independent
              management systems.
            </p>

          </div>

        </div>

      </div>


      {/* ==================================================
          RIGHT SIDE
      ================================================== */}

      <div className="register-right">

        <form
          className="register-card"
          onSubmit={handleRegister}
        >

          {/* HEADER */}

          <div className="register-heading">

            <span>
              ACCOUNT REGISTRATION
            </span>

            <h1>
              Create Account
            </h1>

            <p>
              Set up your account to get started
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="register-error">
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div className="register-success">
              {success}
            </div>

          )}


          {/* USERNAME */}

          <div className="register-input-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />

          </div>


          {/* EMAIL */}

          <div className="register-input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="register-input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />

          </div>


          {/* ACCOUNT TYPE */}

          <div className="account-type-section">

            <div className="account-type-heading">

              <label>
                Account Type
              </label>

              <span>
                Select one system
              </span>

            </div>


            {/* TASK ACCOUNT */}

            <label
              className={`account-type-card ${
                accessType === "task"
                  ? "account-task-selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="accessType"
                value="task"
                checked={
                  accessType === "task"
                }
                onChange={() =>
                  setAccessType("task")
                }
              />

              <div className="custom-radio"></div>

              <div className="account-type-text">

                <strong>
                  Task Management
                </strong>

                <span>
                  Manage personal tasks,
                  progress and productivity
                </span>

              </div>

            </label>


            {/* EMPLOYEE ACCOUNT */}

            <label
              className={`account-type-card ${
                accessType === "employee"
                  ? "account-employee-selected"
                  : ""
              }`}
            >

              <input
                type="radio"
                name="accessType"
                value="employee"
                checked={
                  accessType === "employee"
                }
                onChange={() =>
                  setAccessType("employee")
                }
              />

              <div className="custom-radio"></div>

              <div className="account-type-text">

                <strong>
                  Employee Management
                </strong>

                <span>
                  Manage employee records
                  and workforce information
                </span>

              </div>

            </label>

          </div>


          {/* CREATE ACCOUNT */}

          <button
            type="submit"
            className="create-account-button"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"
            }

          </button>


          {/* LOGIN */}

          <div className="login-link">

            <span>
              Already have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                setShowRegister(false)
              }
            >
              Sign In
            </button>

          </div>


          {/* SECURITY */}

          <div className="register-security">
            Secure account registration
          </div>

        </form>

      </div>

    </div>
  )
}

export default Register