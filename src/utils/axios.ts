import axios from "axios"
import { baseUrl } from './config'

const axiosAuth = axios.create({
    baseURL: baseUrl
})

axiosAuth.interceptors.request.use((config: any) => {
  let token = localStorage.getItem('access_token')
  config.headers.Authorization = `Bearer ${token}`
  return config;
}, (error) => {
  return Promise.reject(error)
})

axiosAuth.interceptors.response.use(response => {
  return response;
}, (error) => {
  if (error.response.data.error === "Unauthorized" && error.response.status === 401) {
    localStorage.removeItem('access_token');
  }
  return Promise.reject(error);
})

const axiosInstance = axios.create({
    baseURL: baseUrl
  })

export {axiosAuth, axiosInstance}