import "./EmployeeTable.css"

function EmployeeTable({ employees, onEdit, onDelete }) {

  return (
    <div className="employee-table-wrapper">

      <table className="employee-table">

        <thead>
          <tr>
            <th>EMPLOYEE</th>
            <th>EMAIL</th>
            <th>DEPARTMENT</th>
            <th>ROLE</th>
            <th>SALARY</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr key={employee.id}>

              <td>
                <div className="employee-name">
                  <div className="employee-avatar">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{employee.name}</strong>
                    <span>ID #{employee.id}</span>
                  </div>
                </div>
              </td>

              <td className="employee-email">
                {employee.email}
              </td>

              <td>
                {employee.department}
              </td>

              <td>
                {employee.role}
              </td>

              <td className="employee-salary">
                ₹{Number(employee.salary).toLocaleString("en-IN")}
              </td>

              <td>
                <span
                  className={`status-badge ${
                    employee.status === "Active"
                      ? "status-active"
                      : "status-inactive"
                  }`}
                >
                  {employee.status}
                </span>
              </td>

              <td>

                <div className="table-actions">

                  <button
                    className="edit-button"
                    onClick={() => onEdit(employee)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => onDelete(employee.id)}
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}

export default EmployeeTable