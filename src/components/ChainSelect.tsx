'use client'

import { supportChains } from '@/constants/chains'
import { Select, SelectItem } from '@nextui-org/react'
import { ChangeEvent, Key, useState } from 'react'
import { mainnet } from 'wagmi'

interface ChainSelectProps {
  onSelectionChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export default function ChainSelect(props: ChainSelectProps) {
  return (
    <Select
      isRequired
      label='Chain'
      onChange={props.onSelectionChange}
      defaultSelectedKeys={[String(mainnet.id)]}
      items={supportChains}
      scrollShadowProps={{
        isEnabled: false
      }}
    >
      {(chain) => (
        <SelectItem
          key={chain.id}
          value={chain.id}
        >
          {chain.name}
        </SelectItem>
      )}
    </Select>
  )
}
