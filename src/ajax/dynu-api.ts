import { AxiosResponse } from 'axios'
import { dynuAxios } from './axios'
import { DynuJwt, DynuDns, DynuUpdateDnsRequest } from '../model'
import Log from '../utils/log'

type DynuAuthenticationResponse = AxiosResponse<DynuJwt>

type DynuDnsListResponse = AxiosResponse<{
  statusCode: number
  domains: Array<DynuDns>
}>

type DynuDnsUpdateResponse = AxiosResponse<{ statusCode: number }>

export const DynuApi = {
  authenticate: (): Promise<DynuAuthenticationResponse> => {
    const clientId = process.env.DYNU_CLIENT_ID
    const clientSecret = process.env.DYNU_CLIENT_SECRET
    Log.debug(
      'Dynu credentials',
      'clientId:',
      clientId,
      'clientSecret:',
      clientSecret,
    )
    return dynuAxios.get('/oauth2/token', {
      headers: {
        accept: 'application/json',
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    })
  },
  listDns: (): Promise<DynuDnsListResponse> => dynuAxios.get('/dns'),
  updateDns: (
    id: string,
    request: DynuUpdateDnsRequest,
  ): Promise<DynuDnsUpdateResponse> => dynuAxios.post(`/dns/${id}`, request),
}
