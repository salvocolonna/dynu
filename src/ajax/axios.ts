import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import Log from '../utils/log'

type DynuAxiosInstance = AxiosInstance & {
  setDefaults: (config: Partial<AxiosRequestConfig>) => void
}

export const axios = Axios.create()

export const dynuAxios = Axios.create({
  baseURL: 'https://api.dynu.com/v2',
}) as DynuAxiosInstance

dynuAxios.interceptors.request.use(
  (req) => {
    Log.debug('dynuAxios - Request to:', req.url)
    return req
  },
  (err) => {
    Log.error('dynuAxios - Request:', err)
    Promise.reject(err)
  },
)

dynuAxios.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err) => {
    Log.error(
      'dynuAxios - Response: ',
      err,
      err.response ? JSON.stringify(err.response, undefined, 2) : undefined,
    )
    Promise.reject(err)
  },
)

dynuAxios.setDefaults = (config) => Object.assign(dynuAxios.defaults, config)
