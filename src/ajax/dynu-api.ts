import { AxiosResponse } from 'axios'
import { dynuAxios } from './axios'
import { DynuDns, DynuJwt, DynuUpdateDnsRequest } from '../model'
import Log from '../utils/log'

type DynuAuthenticationResponse = AxiosResponse<DynuJwt>

type DynuDnsListResponse = AxiosResponse<{
  statusCode: number
  domains: Array<DynuDns>
}>

type DynuDnsUpdateResponse = AxiosResponse<{ statusCode: number }>

async function withRetry<T>(execute: () => Promise<T>): Promise<T> {
  let attempts = 0
  while (attempts < 5) {
    try {
      return await execute()
    } catch (error) {
      attempts++
      Log.error(`Operation failed! Retrying attempt ${attempts}...`)
    }
  }
  Log.error(`${attempts} failed. Cannot continue!`)
  throw new Error('withRetry failed after multiple attempts')
}

abstract class DynuApi {
  static async authenticate(): Promise<DynuAuthenticationResponse> {
    const clientId = process.env.DYNU_CLIENT_ID
    const clientSecret = process.env.DYNU_CLIENT_SECRET
    Log.debug(
      'Dynu credentials',
      'clientId:',
      clientId,
      'clientSecret:',
      clientSecret,
    )
    return withRetry(() =>
      dynuAxios.get('/oauth2/token', {
        headers: {
          accept: 'application/json',
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
      }),
    )
  }

  static async listDns(): Promise<DynuDnsListResponse> {
    return withRetry(() => dynuAxios.get('/dns'))
  }

  static async updateDns(
    id: string,
    request: DynuUpdateDnsRequest,
  ): Promise<DynuDnsUpdateResponse> {
    return withRetry(() => dynuAxios.post(`/dns/${id}`, request))
  }
}

export { DynuApi }
