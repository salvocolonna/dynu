import { DynuApi } from './ajax/dynu-api'
import { axios, dynuAxios } from './ajax/axios'
import Log from './utils/log'
import * as moment from 'moment'
import 'moment/locale/it.js'

require('dotenv').config()

moment.locale('it')

async function start() {
  Log.divider()

  const { data: jwt } = await DynuApi.authenticate()
  dynuAxios.setDefaults({
    headers: { Authorization: `Bearer ${jwt['access_token']}` },
  })
  Log.debug(
    'dynuAxios instance has set new headers:',
    JSON.stringify(dynuAxios.defaults.headers, undefined, 2),
  )

  const { data: publicIp } = await axios.get('https://ifconfig.me/ip')
  Log.debug('Public IP retrieved from ifconfig.me:', publicIp)

  const { data: dnsListResponse } = await DynuApi.listDns()
  Log.debug(
    'DNS/IP Associations retrieved from dynu:',
    (dnsListResponse.domains ?? [])
      .map((d) => `[${d.name} - ${d.ipv4Address}]`)
      .join(', '),
  )
  for (let dns of dnsListResponse.domains) {
    const dnsMsg = `[${dns.name}] - `
    if (dns.ipv4Address === publicIp) {
      Log.info(
        dnsMsg,
        'Stored IP Address',
        dns.ipv4Address,
        'is the same as the current client ip',
        publicIp,
      )
      Log.info(dnsMsg, 'No update needed')
    } else {
      Log.info(
        dnsMsg,
        'Stored IP address seems to be expired: [',
        dns.ipv4Address,
        '] Submitting new IP: [',
        publicIp,
        ']',
      )

      const updateResponse = await DynuApi.updateDns(dns.id.toString(), {
        name: dns.name,
        ipv4Address: publicIp,
      })

      Log.info(
        dnsMsg,
        'Update response',
        JSON.stringify(updateResponse, undefined, 2),
      )
    }
  }
}

start()
