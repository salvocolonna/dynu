import Axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios'
import Log from '../utils/log'

type DynuAxiosInstance = AxiosInstance & {
  setDefaults: (config: Partial<AxiosRequestConfig>) => void
}

export const axios = Axios.create()

export const dynuAxios = Axios.create({
  baseURL: 'https://api.dynu.com/v2',
  headers: { accept: 'application/json' },
}) as DynuAxiosInstance

dynuAxios.interceptors.request.use(
  (req) => {
    Log.debug('dynuAxios - Request to:', req.url)
    return req
  },
  (err) => {
    Log.error('dynuAxios - Request:', JSON.stringify(err, undefined, 2))
    Promise.reject(err)
  },
)

dynuAxios.interceptors.response.use(undefined, (err: AxiosError) => {
  Log.error('dynuAxios - Response: ', err.message)
  Log.debug('dynuAxios - Response: ', JSON.stringify(err, undefined, 2))
  Promise.reject(err)
})

dynuAxios.setDefaults = (config) => Object.assign(dynuAxios.defaults, config)
