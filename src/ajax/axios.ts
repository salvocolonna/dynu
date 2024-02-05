import Axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'

type DynuAxiosInstance = AxiosInstance & {
  setDefaults: (config: Partial<AxiosRequestConfig>) => void
}

export const axios = Axios.create()

export const dynuAxios = Axios.create({
  baseURL: 'https://api.dynu.com/v2',
}) as DynuAxiosInstance

dynuAxios.interceptors.request.use(
  (req) => req,
  (err) => Promise.reject(err),
)

dynuAxios.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err) => Promise.reject(err),
)

dynuAxios.setDefaults = (config) => Object.assign(dynuAxios.defaults, config)
