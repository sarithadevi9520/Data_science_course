import { useState } from "react"
import "./Login.css"

function Login({ setLoggedIn, setShowRegister }) {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [accessType, setAccessType] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  async function handleLogin(event) {

    event.preventDefault()

    setError("")


    // Check access type
    if (!accessType) {
      setError("Please select an access type")
      return
    }


    setLoading(true)


    const formData = new URLSearchParams()

    formData.append("username", username)
    formData.append("password", password)


    try {

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },

          body: formData
        }
      )


      const data = await response.json()


      if (response.ok) {

        // Store JWT token
        localStorage.setItem(
          "token",
          data.access_token
        )


        // Store username
        localStorage.setItem(
          "username",
          username
        )


        // Store selected access type
        localStorage.setItem(
          "accessType",
          accessType
        )


        // Login successful
        setLoggedIn(true)

      } else {

        setError(
          data.detail || "Invalid username or password"
        )
      }

    } catch (error) {

      console.error("Login error:", error)

      setError(
        "Could not connect to server"
      )

    } finally {

      setLoading(false)
    }
  }


  return (

    <div className="login-page">


      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <section className="login-left">


        {/* BRAND */}

        <div className="manage-flow-brand">

          <div className="brand-logo">
            MF
          </div>

          <div className="brand-details">

            <h2>
              MANAGE FLOW
            </h2>

            <span>
              Tasks&nbsp;&nbsp;|&nbsp;&nbsp;Employees&nbsp;&nbsp;|&nbsp;&nbsp;Productivity
            </span>

          </div>

        </div>


        {/* MAIN CONTENT */}

        <div className="login-left-content">


          <div className="platform-label">
            MANAGEMENT PLATFORM
          </div>


          <h1>
            Manage your
            <br />

            <span>
              work & workforce.
            </span>
          </h1>


          <p className="platform-description">
            One platform designed with two independent
            management systems to help you organize
            your work and manage your workforce efficiently.
          </p>


          {/* SYSTEM CARDS */}

          <div className="system-preview">


            {/* TASK MANAGEMENT */}

            <div className="preview-card">

              <div className="preview-icon task-icon">
                ✓
              </div>

              <div className="preview-content">

                <h3>
                  Task Management
                </h3>

                <p>
                  Create, organize and track your tasks.
                </p>

                <div className="preview-points">

                  <span>
                    ✓ Create & manage tasks
                  </span>

                  <span>
                    ✓ Track progress
                  </span>

                  <span>
                    ✓ Stay productive
                  </span>

                </div>

              </div>

            </div>


            {/* EMPLOYEE MANAGEMENT */}

            <div className="preview-card">

              <div className="preview-icon employee-icon">
                👥
              </div>

              <div className="preview-content">

                <h3>
                  Employee Management
                </h3>

                <p>
                  Manage employee records and workforce data.
                </p>

                <div className="preview-points">

                  <span>
                    ✓ Add / Edit / Delete employees
                  </span>

                  <span>
                    ✓ Search & filter records
                  </span>

                  <span>
                    ✓ Keep your team organized
                  </span>

                </div>

              </div>

            </div>


          </div>


        </div>


        {/* LEFT FOOTER */}

        <div className="login-left-footer">

          <span className="footer-line"></span>

          <span>
            One platform. Two independent systems.
          </span>

        </div>


      </section>



      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <section className="login-right">


        <form
          className="login-card"
          onSubmit={handleLogin}
        >


          {/* HEADING */}

          <div className="login-heading">

            <div className="secure-label">
              SECURE LOGIN
            </div>

            <h2>
              Welcome Back
            </h2>

            <p>
              Select your system and login to continue
            </p>

          </div>


          {/* ERROR */}

          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          {/* USERNAME */}

          <div className="input-group">

            <label>
              Username
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                👤
              </span>

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

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                🔒
              </span>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

            </div>

          </div>


          {/* =================================================
              ACCESS TYPE
          ================================================= */}

          <div className="access-section">


            <div className="access-heading">

              <label>
                Access Type
              </label>

              <span>
                {accessType
                  ? "Selected"
                  : "Select one"
                }
              </span>

            </div>


            <div className="access-options">


              {/* TASK ACCESS */}

              <div
                className={`access-card ${
                  accessType === "task"
                    ? "selected task-selected"
                    : ""
                }`}
                onClick={() =>
                  setAccessType("task")
                }
              >

                <div
                  className={`radio ${
                    accessType === "task"
                      ? "radio-selected"
                      : ""
                  }`}
                >

                  {accessType === "task" && (
                    <span></span>
                  )}

                </div>


                <div className="access-icon task-access-icon">
                  ✓
                </div>


                <div className="access-info">

                  <h3>
                    Task Management
                  </h3>

                  <p>
                    Manage your tasks and track progress
                  </p>

                </div>

              </div>



              {/* EMPLOYEE ACCESS */}

              <div
                className={`access-card ${
                  accessType === "employee"
                    ? "selected employee-selected"
                    : ""
                }`}
                onClick={() =>
                  setAccessType("employee")
                }
              >

                <div
                  className={`radio ${
                    accessType === "employee"
                      ? "radio-selected employee-radio"
                      : ""
                  }`}
                >

                  {accessType === "employee" && (
                    <span></span>
                  )}

                </div>


                <div className="access-icon employee-access-icon">
                  👥
                </div>


                <div className="access-info">

                  <h3>
                    Employee Management
                  </h3>

                  <p>
                    Manage employee records and information
                  </p>

                </div>

              </div>


            </div>

          </div>



          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Signing in..."
              : "Sign In"
            }

          </button>



          {/* REGISTER */}

          <div className="register-area">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() =>
                setShowRegister(true)
              }
            >
              Create Account
            </button>

          </div>


          {/* SECURITY */}

          <div className="login-security">

            🔒
            <span>
              Secure authentication powered by Manage Flow
            </span>

          </div>


        </form>


      </section>


    </div>
  )
}


export default Login