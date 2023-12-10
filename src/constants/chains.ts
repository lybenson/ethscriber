import { arbitrum, eos, mainnet, polygon, zkSync } from 'viem/chains'

// import * as chains from 'viem/chains'
// function fileterMainnetChain() {
//   const mainnetChain: chains.Chain[] = []
//   Object.keys(chains).forEach((chainName: string) => {
//     // @ts-ignore
//     const chain: chains.Chain = chains[chainName]
//     if (!chain.testnet) mainnetChain.push(chain)
//   })

//   return mainnetChain
// }

export const supportChains = [mainnet, arbitrum, zkSync, eos, polygon] as const

export type supportChainIds = (typeof supportChains)[number]['id']
