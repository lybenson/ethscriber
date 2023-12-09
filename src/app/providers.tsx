'use client'

import { NextUIProvider } from '@nextui-org/react'
import { WagmiConfig, createConfig } from 'wagmi'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
import { supportChains } from '@/constants/chains'

const config = createConfig(
  getDefaultConfig({
    appName: 'ethscriber',
    walletConnectProjectId: '',
    // publicClient: publicProvider(),
    chains: supportChains
  })
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='dark'
      >
        <WagmiConfig config={config}>
          <ConnectKitProvider
            theme='auto'
            mode={'dark'}
          >
            {children}
          </ConnectKitProvider>
        </WagmiConfig>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
