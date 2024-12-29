import axios from 'axios'

const baseURL = 'https://dummyjson.com'

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
