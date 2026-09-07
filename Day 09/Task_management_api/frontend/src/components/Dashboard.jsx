import { useEffect, useState } from "react"
import "./Dashboard.css"

function Dashboard({ setLoggedIn }) {

    // =====================================================
    // TASK DATA
    // =====================================================

    const [tasks, setTasks] = useState([])


    // =====================================================
    // CREATE TASK
    // =====================================================

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    // =====================================================
    // EDIT TASK
    // =====================================================

    const [editingTaskId, setEditingTaskId] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editDescription, setEditDescription] = useState("")
    const [editCompleted, setEditCompleted] = useState(false)


    // =====================================================
    // VIEW SINGLE TASK
    // =====================================================

    const [viewingTask, setViewingTask] = useState(null)
    const [viewLoading, setViewLoading] = useState(false)


    // =====================================================
    // FILTER
    // =====================================================

    // dashboard is the default active page
    const [activeFilter, setActiveFilter] = useState("dashboard")

    const [searchTerm, setSearchTerm] = useState("")


    // =====================================================
    // TOAST
    // =====================================================

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    })


    // =====================================================
    // USERNAME
    // =====================================================

    const userName =
        localStorage.getItem("username") || "User"


    // =====================================================
    // SHOW TOAST
    // =====================================================

    function showToast(message, type = "success") {

        setToast({
            show: true,
            message: message,
            type: type
        })

        setTimeout(() => {

            setToast({
                show: false,
                message: "",
                type: "success"
            })

        }, 3000)
    }


    // =====================================================
    // STATISTICS
    // =====================================================

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length


    const pendingTasks = tasks.filter(
        (task) => !task.completed
    ).length


    const completionRate =
        tasks.length === 0
            ? 0
            : Math.round(
                (completedTasks / tasks.length) * 100
            )


    // =====================================================
    // GET ALL TASKS
    // =====================================================

    async function fetchTasks() {

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/tasks",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            const data = await response.json()


            if (response.ok) {

                setTasks(data)

            } else {

                showToast(
                    data.detail || "Failed to load tasks",
                    "error"
                )
            }

        } catch (error) {

            console.error("Get tasks error:", error)

            showToast(
                "Could not connect to server",
                "error"
            )
        }
    }


    // =====================================================
    // GET SINGLE TASK
    // =====================================================

    async function handleViewTask(taskId) {

        const token = localStorage.getItem("token")

        setViewLoading(true)

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/tasks/${taskId}`,
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            const data = await response.json()


            if (response.ok) {

                setViewingTask(data)

            } else {

                showToast(
                    data.detail || "Failed to load task",
                    "error"
                )
            }

        } catch (error) {

            console.error("Get single task error:", error)

            showToast(
                "Could not connect to server",
                "error"
            )

        } finally {

            setViewLoading(false)
        }
    }


    // =====================================================
    // CREATE TASK
    // =====================================================

    async function handleCreateTask(event) {

        event.preventDefault()

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/tasks",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title: title,
                        description: description,
                        completed: false
                    })
                }
            )


            const data = await response.json()


            if (response.ok) {

                setTitle("")
                setDescription("")

                showToast(
                    "Task created successfully!"
                )

                fetchTasks()

            } else {

                showToast(
                    data.detail || "Failed to create task",
                    "error"
                )
            }

        } catch (error) {

            console.error("Create task error:", error)

            showToast(
                "Could not connect to server",
                "error"
            )
        }
    }


    // =====================================================
    // START EDIT
    // =====================================================

    function handleEdit(task) {

        setEditingTaskId(task.id)

        setEditTitle(task.title)

        setEditDescription(
            task.description
        )

        setEditCompleted(
            task.completed
        )

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }


    // =====================================================
    // UPDATE TASK - PUT
    // =====================================================

    async function handleUpdateTask(event) {

        event.preventDefault()

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/tasks/${editingTaskId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        title: editTitle,
                        description: editDescription,
                        completed: editCompleted
                    })
                }
            )


            const data = await response.json()


            if (response.ok) {

                setEditingTaskId(null)

                setEditTitle("")

                setEditDescription("")

                setEditCompleted(false)

                showToast(
                    "Task updated successfully!"
                )

                fetchTasks()

            } else {

                showToast(
                    data.detail || "Failed to update task",
                    "error"
                )
            }

        } catch (error) {

            console.error("Update task error:", error)

            showToast(
                "Could not connect to server",
                "error"
            )
        }
    }


    // =====================================================
    // CANCEL EDIT
    // =====================================================

    function handleCancelEdit() {

        setEditingTaskId(null)

        setEditTitle("")

        setEditDescription("")

        setEditCompleted(false)
    }


    // =====================================================
    // DELETE TASK
    // =====================================================

    async function handleDeleteTask(taskId) {

        const token = localStorage.getItem("token")

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/tasks/${taskId}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            const data = await response.json()


            if (response.ok) {

                showToast(
                    "Task deleted successfully!"
                )

                fetchTasks()

            } else {

                showToast(
                    data.detail || "Failed to delete task",
                    "error"
                )
            }

        } catch (error) {

            console.error("Delete task error:", error)

            showToast(
                "Could not connect to server",
                "error"
            )
        }
    }


    // =====================================================
    // UPDATE STATUS - PATCH
    // =====================================================

    async function handleToggleStatus(task) {

        const token = localStorage.getItem("token")

        const newStatus = !task.completed

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/tasks/${task.id}/status?completed=${newStatus}`,
                {
                    method: "PATCH",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            const data = await response.json()


            if (response.ok) {

                showToast(
                    newStatus
                        ? "Task marked as completed!"
                        : "Task moved to pending!"
                )

                fetchTasks()

            } else {

                showToast(
                    data.detail || "Failed to update status",
                    "error"
                )
            }

        } catch (error) {

            console.error("Patch status error:", error)

            showToast(
                "Could not connect to server",
                "error"
            )
        }
    }


    // =====================================================
    // LOGOUT
    // =====================================================

    function handleLogout() {

        localStorage.removeItem("token")

        localStorage.removeItem("username")

        setLoggedIn(false)
    }


    // =====================================================
    // FILTER TASKS
    // =====================================================

    const filteredTasks = tasks.filter((task) => {

        const taskTitle =
            task.title?.toLowerCase() || ""

        const taskDescription =
            task.description?.toLowerCase() || ""

        const search =
            searchTerm.toLowerCase()


        const matchesSearch =
            taskTitle.includes(search) ||
            taskDescription.includes(search)


        // COMPLETED
        if (activeFilter === "completed") {

            return (
                task.completed &&
                matchesSearch
            )
        }


        // PENDING
        if (activeFilter === "pending") {

            return (
                !task.completed &&
                matchesSearch
            )
        }


        // DASHBOARD + ALL TASKS
        return matchesSearch
    })


    // =====================================================
    // LOAD TASKS WHEN PAGE OPENS
    // =====================================================

    useEffect(() => {

        fetchTasks()

    }, [])


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="dashboard-layout">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="sidebar">


                {/* BRAND */}

                <div className="brand">

                    <div className="brand-logo">
                        ✓
                    </div>

                    <div>

                        <h2>
                            TaskFlow
                        </h2>

                        <span>
                            Task Manager
                        </span>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="sidebar-nav">


                    {/* DASHBOARD */}

                    <button
                        className={
                            activeFilter === "dashboard"
                                ? "nav-item active"
                                : "nav-item"
                        }

                        onClick={() => {

                            setActiveFilter("dashboard")

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })

                        }}
                    >

                        <span className="nav-icon">
                            ▦
                        </span>

                        Dashboard

                    </button>


                    {/* ALL TASKS */}

                    <button
                        className={
                            activeFilter === "all"
                                ? "nav-item active"
                                : "nav-item"
                        }

                        onClick={() => {

                            setActiveFilter("all")

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })

                        }}
                    >

                        <span className="nav-icon">
                            ☷
                        </span>

                        All Tasks

                    </button>


                    {/* PENDING */}

                    <button
                        className={
                            activeFilter === "pending"
                                ? "nav-item active"
                                : "nav-item"
                        }

                        onClick={() => {

                            setActiveFilter("pending")

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })

                        }}
                    >

                        <span className="nav-icon">
                            ◷
                        </span>

                        Pending

                    </button>


                    {/* COMPLETED */}

                    <button
                        className={
                            activeFilter === "completed"
                                ? "nav-item active"
                                : "nav-item"
                        }

                        onClick={() => {

                            setActiveFilter("completed")

                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })

                        }}
                    >

                        <span className="nav-icon">
                            ✓
                        </span>

                        Completed

                    </button>

                </nav>


                {/* SIDEBAR BOTTOM */}

                <div className="sidebar-bottom">

                    <div className="info-box">

                        <div className="info-icon">
                            i
                        </div>

                        <div>

                            <strong>
                                TaskFlow
                            </strong>

                            <p>
                                Stay organized and productive.
                            </p>

                        </div>

                    </div>

                </div>

            </aside>



            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="main-content">


                {/* TOP HEADER */}

                <header className="top-header">

                    <div></div>


                    <div className="user-area">

                        <div className="user-avatar">

                            {userName
                                .charAt(0)
                                .toUpperCase()
                            }

                        </div>


                        <div className="user-info">

                            <strong>
                                {userName}
                            </strong>

                            <span>
                                My Account
                            </span>

                        </div>


                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            ↪ Logout
                        </button>

                    </div>

                </header>



                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <div className="content-wrapper">


                    {/* =================================================
                        WELCOME
                    ================================================= */}

                    <section className="welcome-section">

                        <div>

                            <p className="workspace-label">
                                YOUR WORKSPACE
                            </p>

                            <h1>
                                Hello, {userName} 👋
                            </h1>

                            <p className="welcome-text">
                                Here's an overview of your
                                tasks and productivity.
                            </p>

                        </div>


                        <button
                            className="add-task-button"

                            onClick={() => {

                                document
                                    .getElementById(
                                        "create-task"
                                    )
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })

                            }}
                        >
                            + Add New Task
                        </button>

                    </section>



                    {/* =================================================
                        FOUR STATISTICS BOXES
                    ================================================= */}

                    <section className="stats-container">


                        {/* TOTAL TASKS */}

                        <div className="stat-card total">

                            <div className="stat-icon">
                                ☷
                            </div>

                            <div className="stat-content">

                                <div className="stat-label">
                                    Total Tasks
                                </div>

                                <div className="stat-number">
                                    {tasks.length}
                                </div>

                                <div className="stat-description">
                                    All your tasks
                                </div>

                            </div>

                        </div>



                        {/* COMPLETED */}

                        <div className="stat-card completed">

                            <div className="stat-icon">
                                ✓
                            </div>

                            <div className="stat-content">

                                <div className="stat-label">
                                    Completed
                                </div>

                                <div className="stat-number">
                                    {completedTasks}
                                </div>

                                <div className="stat-description">
                                    Tasks finished
                                </div>

                            </div>

                        </div>



                        {/* PENDING */}

                        <div className="stat-card pending">

                            <div className="stat-icon">
                                ◷
                            </div>

                            <div className="stat-content">

                                <div className="stat-label">
                                    Pending
                                </div>

                                <div className="stat-number">
                                    {pendingTasks}
                                </div>

                                <div className="stat-description">
                                    Tasks remaining
                                </div>

                            </div>

                        </div>



                        {/* COMPLETION RATE */}

                        <div className="stat-card rate">

                            <div className="stat-icon">
                                %
                            </div>

                            <div className="stat-content">

                                <div className="stat-label">
                                    Completion Rate
                                </div>

                                <div className="stat-number">
                                    {completionRate}%
                                </div>

                                <div className="progress-container">

                                    <div
                                        className="progress-bar"
                                        style={{
                                            width:
                                                `${completionRate}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>

                    </section>



                    {/* =================================================
                        CREATE / EDIT TASK
                    ================================================= */}

                    <section
                        id="create-task"
                        className="task-form-card"
                    >

                        {editingTaskId === null ? (

                            <>

                                <div className="form-heading">

                                    <div>

                                        <h2>
                                            Create New Task
                                        </h2>

                                        <p>
                                            Add a new task to your workspace.
                                        </p>

                                    </div>


                                    <div className="form-icon">
                                        +
                                    </div>

                                </div>


                                <form
                                    onSubmit={handleCreateTask}
                                    className="task-form"
                                >

                                    <input
                                        type="text"
                                        placeholder="Task title"
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />


                                    <textarea
                                        placeholder="Task description"
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(
                                                event.target.value
                                            )
                                        }
                                        required
                                    ></textarea>


                                    <button
                                        className="create-button"
                                        type="submit"
                                    >
                                        + Create Task
                                    </button>

                                </form>

                            </>

                        ) : (

                            <>

                                <div className="form-heading">

                                    <div>

                                        <h2>
                                            Edit Task
                                        </h2>

                                        <p>
                                            Update your task details.
                                        </p>

                                    </div>


                                    <div className="form-icon edit">
                                        ✎
                                    </div>

                                </div>


                                <form
                                    onSubmit={handleUpdateTask}
                                    className="task-form"
                                >

                                    <input
                                        type="text"
                                        placeholder="Task title"
                                        value={editTitle}
                                        onChange={(event) =>
                                            setEditTitle(
                                                event.target.value
                                            )
                                        }
                                        required
                                    />


                                    <textarea
                                        placeholder="Task description"
                                        value={editDescription}
                                        onChange={(event) =>
                                            setEditDescription(
                                                event.target.value
                                            )
                                        }
                                        required
                                    ></textarea>


                                    <label className="checkbox-label">

                                        <input
                                            type="checkbox"
                                            checked={editCompleted}
                                            onChange={(event) =>
                                                setEditCompleted(
                                                    event.target.checked
                                                )
                                            }
                                        />

                                        Mark task as completed

                                    </label>


                                    <div className="edit-form-buttons">

                                        <button
                                            className="update-button"
                                            type="submit"
                                        >
                                            ✓ Update Task
                                        </button>


                                        <button
                                            className="cancel-button"
                                            type="button"
                                            onClick={
                                                handleCancelEdit
                                            }
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </form>

                            </>

                        )}

                    </section>



                    {/* =================================================
                        MY TASKS
                    ================================================= */}

                    <section className="tasks-section">


                        {/* TASK HEADER */}

                        <div className="tasks-header">

                            <div>

                                <h2>
                                    My Tasks
                                </h2>

                                <p>
                                    Manage and organize your work
                                </p>

                            </div>


                            {/* SEARCH */}

                            <div className="search-box">

                                <span>
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                        </div>



                        {/* FILTER BUTTONS */}

                        <div className="task-filters">


                            <button
                                className={
                                    activeFilter === "all"
                                        ? "filter-button active"
                                        : "filter-button"
                                }

                                onClick={() =>
                                    setActiveFilter("all")
                                }
                            >
                                All
                            </button>


                            <button
                                className={
                                    activeFilter === "pending"
                                        ? "filter-button active pending-filter"
                                        : "filter-button"
                                }

                                onClick={() =>
                                    setActiveFilter("pending")
                                }
                            >
                                Pending
                            </button>


                            <button
                                className={
                                    activeFilter === "completed"
                                        ? "filter-button active completed-filter"
                                        : "filter-button"
                                }

                                onClick={() =>
                                    setActiveFilter("completed")
                                }
                            >
                                Completed
                            </button>

                        </div>



                        {/* TASK LIST */}

                        <div className="task-list">


                            {filteredTasks.length === 0 ? (

                                <div className="empty-state">

                                    <div className="empty-icon">
                                        ✓
                                    </div>

                                    <h3>
                                        No tasks found
                                    </h3>

                                    <p>

                                        {searchTerm
                                            ? "Try a different search."
                                            : "Create a task to get started."
                                        }

                                    </p>

                                </div>

                            ) : (

                                filteredTasks.map((task) => (

                                    <div
                                        className={
                                            task.completed
                                                ? "task-row completed-task"
                                                : "task-row pending-task"
                                        }

                                        key={task.id}
                                    >


                                        {/* STATUS BUTTON */}

                                        <button
                                            className={
                                                task.completed
                                                    ? "task-check checked"
                                                    : "task-check"
                                            }

                                            onClick={() =>
                                                handleToggleStatus(
                                                    task
                                                )
                                            }

                                            title={
                                                task.completed
                                                    ? "Mark as pending"
                                                    : "Mark as completed"
                                            }
                                        >

                                            {task.completed
                                                ? "✓"
                                                : ""
                                            }

                                        </button>



                                        {/* TASK DETAILS */}

                                        <div className="task-details">

                                            <div className="task-title-line">

                                                <h3
                                                    className={
                                                        task.completed
                                                            ? "task-title completed-title"
                                                            : "task-title"
                                                    }
                                                >
                                                    {task.title}
                                                </h3>


                                                <span
                                                    className={
                                                        task.completed
                                                            ? "status-badge completed-badge"
                                                            : "status-badge pending-badge"
                                                    }
                                                >

                                                    {task.completed
                                                        ? "Completed"
                                                        : "Pending"
                                                    }

                                                </span>

                                            </div>


                                            <p className="task-description">
                                                {task.description}
                                            </p>


                                            <span className="task-id">
                                                Task #{task.id}
                                            </span>

                                        </div>



                                        {/* ACTION BUTTONS */}

                                        <div className="task-actions">


                                            {/* GET SINGLE TASK */}

                                            <button
                                                className="action-button view-action"

                                                onClick={() =>
                                                    handleViewTask(
                                                        task.id
                                                    )
                                                }

                                                title="View task"
                                            >
                                                👁
                                            </button>


                                            {/* PUT */}

                                            <button
                                                className="action-button edit-action"

                                                onClick={() =>
                                                    handleEdit(
                                                        task
                                                    )
                                                }

                                                title="Edit task"
                                            >
                                                ✎
                                            </button>


                                            {/* DELETE */}

                                            <button
                                                className="action-button delete-action"

                                                onClick={() =>
                                                    handleDeleteTask(
                                                        task.id
                                                    )
                                                }

                                                title="Delete task"
                                            >
                                                ×
                                            </button>

                                        </div>

                                    </div>

                                ))

                            )}

                        </div>

                    </section>

                </div>

            </main>



            {/* =================================================
                VIEW TASK MODAL
            ================================================= */}

            {viewingTask && (

                <div
                    className="task-modal-overlay"

                    onClick={() =>
                        setViewingTask(null)
                    }
                >

                    <div
                        className="task-modal"

                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >


                        {/* MODAL HEADER */}

                        <div className="task-modal-header">

                            <div>

                                <p className="modal-label">
                                    TASK DETAILS
                                </p>

                                <h2>
                                    {viewingTask.title}
                                </h2>

                            </div>


                            <button
                                className="modal-close"

                                onClick={() =>
                                    setViewingTask(null)
                                }
                            >
                                ×
                            </button>

                        </div>



                        {/* STATUS */}

                        <div className="modal-status">

                            <span
                                className={
                                    viewingTask.completed
                                        ? "status-badge completed-badge"
                                        : "status-badge pending-badge"
                                }
                            >

                                {viewingTask.completed
                                    ? "Completed"
                                    : "Pending"
                                }

                            </span>

                        </div>



                        {/* DESCRIPTION */}

                        <div className="modal-detail">

                            <span>
                                Description
                            </span>

                            <p>
                                {viewingTask.description}
                            </p>

                        </div>



                        {/* ID */}

                        <div className="modal-detail">

                            <span>
                                Task ID
                            </span>

                            <p>
                                #{viewingTask.id}
                            </p>

                        </div>



                        {/* CREATED DATE */}

                        <div className="modal-detail">

                            <span>
                                Created At
                            </span>

                            <p>
                                {viewingTask.created_at
                                    ? new Date(
                                        viewingTask.created_at
                                    ).toLocaleString()
                                    : "Not available"
                                }
                            </p>

                        </div>



                        {/* CLOSE */}

                        <button
                            className="modal-done-button"

                            onClick={() =>
                                setViewingTask(null)
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}



            {/* =================================================
                LOADING
            ================================================= */}

            {viewLoading && (

                <div className="view-loading">
                    Loading task...
                </div>

            )}



            {/* =================================================
                TOAST
            ================================================= */}

            {toast.show && (

                <div
                    className={
                        toast.type === "success"
                            ? "toast success-toast"
                            : "toast error-toast"
                    }
                >

                    <div className="toast-icon">

                        {toast.type === "success"
                            ? "✓"
                            : "!"
                        }

                    </div>


                    <div>

                        <strong>

                            {toast.type === "success"
                                ? "Success"
                                : "Error"
                            }

                        </strong>

                        <p>
                            {toast.message}
                        </p>

                    </div>

                </div>

            )}

        </div>
    )
}

export default Dashboard