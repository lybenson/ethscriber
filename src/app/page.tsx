'use client'
import ChainSelect from '@/components/ChainSelect'
import Header from '@/components/Header'
import PrivateKeyMode from '@/components/PrivateKeyMode'
import WalletMode from '@/components/WalletMode'
import { Tab, Tabs } from '@nextui-org/react'

export default function Home() {
  return (
    <>
      <Header />
      <main className='max-w-7xl m-auto px-6 mt-8 flex-wrap'>
        <Tabs
          color='success'
          className='w-full m-auto text-center'
        >
          <Tab
            key='wallet-mode'
            title='钱包模式'
          >
            <WalletMode />
          </Tab>

          <Tab
            key='pk-mode'
            title='私钥模式'
          >
            <PrivateKeyMode />
          </Tab>
        </Tabs>

        <ChainSelect />
      </main>
    </>
  )
}
