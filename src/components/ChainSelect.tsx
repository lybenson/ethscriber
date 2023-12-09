'use client'

import { supportChains } from '@/constants/chains'
import { Select, SelectItem } from '@nextui-org/react'

export default function ChainSelect() {
  return (
    <Select defaultSelectedKeys={String(supportChains[0].id)}>
      {supportChains.map((chain) => (
        <SelectItem key={chain.id}>{chain.name}</SelectItem>
      ))}
    </Select>
  )
}
