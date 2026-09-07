import { useEffect, useState } from "react"
import "./EmployeeForm.css"

const emptyEmployee = {
  name: "",
  email: "",
  department: "",
  role: "",
  salary: "",
  phone: "",
  status: "Active"
}

function EmployeeForm({ selected, onSave, onCancel }) {
  const [form, setForm] = useState(emptyEmployee)

  useEffect(() => {
    if (selected) {
      setForm(selected)
    } else {
      setForm(emptyEmployee)
    }
  }, [selected])

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    onSave({
      ...form,
      salary: Number(form.salary)
    })
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit}>

      <div className="form-grid">

        <div className="form-field">
          <label>Name *</label>

          <input
            name="name"
            placeholder="Enter employee name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Email *</label>

          <input
            name="email"
            type="email"
            placeholder="employee@company.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Department *</label>

          <input
            name="department"
            placeholder="e.g. IT"
            value={form.department}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Role *</label>

          <input
            name="role"
            placeholder="e.g. Software Developer"
            value={form.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Salary *</label>

          <input
            name="salary"
            type="number"
            min="0"
            placeholder="Enter salary"
            value={form.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Phone</label>

          <input
            name="phone"
            placeholder="Optional"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-field full-width">
          <label>Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Terminated">Terminated</option>
            <option value="On Leave">On Leave</option>
          </select>

        </div>

      </div>

      <div className="form-actions">

        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-button"
        >
          {selected ? "Update Employee" : "Add Employee"}
        </button>

      </div>

    </form>
  )
}

export default EmployeeForm