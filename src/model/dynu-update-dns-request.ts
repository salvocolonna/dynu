export type DynuUpdateDnsRequest = {
  name: string
  group?: string
  ipv4Address: string
  ipv6Address?: string
  ttl?: number
  ipv4?: boolean
  ipv6?: boolean
  ipv4WildcardAlias?: boolean
  ipv6WildcardAlias?: boolean
  allowZoneTransfer?: boolean
  dnssec?: boolean
}
