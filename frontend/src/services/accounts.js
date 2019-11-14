import axios from 'axios'

const login = async (user) => {
  const response = await axios.post("/login", user)
  return response
}

const register = async (user) => {
  const response = await axios.post("/register", user)
  return response
}

export default { login, register }