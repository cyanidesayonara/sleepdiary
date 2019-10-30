import axios from 'axios'

const baseUrl = 'api/account/'

const login = async (user) => {
  const response = await axios.post(`${baseUrl}login`, user)
  return response.data
}

const register = async (user) => {
  const response = await axios.post(`${baseUrl}register`, user)
  return response.data
}

export default { login, register }