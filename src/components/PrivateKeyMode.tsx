import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Textarea
} from '@nextui-org/react'
import ChainSelect from './ChainSelect'
import { FormEvent, useEffect, useState } from 'react'
import { Address, useAccount } from 'wagmi'
import {
  Chain,
  Hex,
  createWalletClient,
  extractChain,
  http,
  stringToHex,
  toHex
} from 'viem'
import { supportChainIds, supportChains } from '@/constants/chains'
import Logger from './Logger'
import { privateKeyToAccount } from 'viem/accounts'

export default function PrivateKeyMode() {
  const [transferToSelf, setTransferToSelf] = useState(true)
  const [chainId, setChainId] = useState(1)
  const [receiver, setReceiver] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [rpc, setRpc] = useState('')
  const [chain, setChain] = useState<Chain>()
  const [inscription, setInscription] = useState('')
  const [logs, setLogs] = useState<string[]>([])
  const [inscriptionMode, setInscriptionMode] = useState<'text' | 'hex'>('text')
  const [running, setRunning] = useState(false)

  useEffect(() => {
    setChain(
      extractChain({
        chains: supportChains,
        id: chainId as supportChainIds
      })
    )
  }, [chainId])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const account = privateKeyToAccount(privateKey as Hex)

    const walletClient = createWalletClient({
      account,
      transport: http(rpc ? rpc : chain?.rpcUrls.public.http[0])
    })
    try {
      setRunning(true)
      const data: Hex =
        inscriptionMode === 'text' ? toHex(inscription) : (inscription as Hex)
      const to: Address = transferToSelf
        ? account.address
        : (receiver as Address)
      await walletClient.sendTransaction({ to, data, account, chain })
      setInterval(async () => {
        try {
          await walletClient.sendTransaction({ to, data, account, chain })
        } catch (error: any) {
          setLogs([error.details, ...logs])
        }
      }, 1000)
    } catch (error: any) {
    } finally {
      setRunning(false)
    }
  }

  return (
    <div>
      <form
        className='flex flex-col gap-6'
        onSubmit={onSubmit}
      >
        <ChainSelect
          onSelectionChange={(event) => {
            setChainId(Number(event.target.value))
          }}
        />

        <div>
          <Switch
            isSelected={transferToSelf}
            onValueChange={setTransferToSelf}
            color='success'
          >
            转给自己
          </Switch>
          {!transferToSelf && (
            <Input
              label='接收地址'
              isRequired={!transferToSelf}
              value={receiver}
              onValueChange={setReceiver}
              placeholder='0x'
              className='mt-2'
            />
          )}
        </div>

        <Input
          label='私钥'
          isRequired
          value={privateKey}
          onValueChange={setPrivateKey}
          placeholder='0x'
        />

        <Input
          label='RPC(Optional)'
          value={rpc}
          onValueChange={setRpc}
          placeholder={chain?.rpcUrls.public.http[0]}
        />

        <div>
          <RadioGroup
            orientation='horizontal'
            value={inscriptionMode}
            onValueChange={(value) =>
              setInscriptionMode(value as 'text' | 'hex')
            }
          >
            <Radio value='text'>文本</Radio>
            <Radio value='hex'>16进制</Radio>
          </RadioGroup>

          <Textarea
            label='铭文内容'
            isRequired
            value={inscription}
            onValueChange={setInscription}
            className='mt-2'
            placeholder={
              inscriptionMode === 'hex'
                ? '0x...'
                : `data:,{"p":"prc-20","op":"mint","tick":"pols","amt":"100000000"}`
            }
          />
        </div>

        <Button
          color='success'
          type='submit'
          className='text-lg'
          isLoading={running}
        >
          Run
        </Button>
      </form>

      <Logger logs={logs} />
    </div>
  )
}
