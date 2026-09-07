import axios from "axios"


const api = axios.create({
  baseURL: "http://localhost:8000/api"
})


// =========================================================
// JWT INTERCEPTOR
// =========================================================

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token")

    if (token) {

      config.headers.Authorization = `Bearer ${token}`

    }

    return config
  },

  (error) => {

    return Promise.reject(error)

  }
)


// =========================================================
// GET ALL EMPLOYEES
// =========================================================

export const getEmployees = (search = "") => {
  return api.get("/employees/", {
    params: {
      search: search || undefined
    }
  })
}


// =========================================================
// CREATE EMPLOYEE
// =========================================================

export const createEmployee = (data) => {

  return api.post(
    "/employees/",
    data
  )

}


// =========================================================
// UPDATE EMPLOYEE
// =========================================================

export const updateEmployee = (
  id,
  data
) => {

  return api.put(
    `/employees/${id}`,
    data
  )

}


// =========================================================
// DELETE EMPLOYEE
// =========================================================

export const deleteEmployee = (id) => {

  return api.delete(
    `/employees/${id}`
  )

}