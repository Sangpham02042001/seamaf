import axios from "axios"
import { baseUrl } from './config'

const axiosAuth = axios.create({
    baseURL: baseUrl
})

const axiosInstance = axios.create({
    baseURL: baseUrl
  })

export {axiosAuth, axiosInstance}