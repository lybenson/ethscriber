import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Switch,
  Textarea
} from '@nextui-org/react'
import ChainSelect from './ChainSelect'
import { FormEvent, useState } from 'react'
import { Address, useAccount, useNetwork } from 'wagmi'
import { sendTransaction, switchNetwork } from 'wagmi/actions'
import { useModal } from 'connectkit'
import { Hex, toHex } from 'viem'
import { useFormState } from 'react-dom'

export default function WalletMode() {
  const [transferToSelf, setTransferToSelf] = useState(true)
  const [chainId, setChainId] = useState(1)
  const [receiver, setReceiver] = useState('')
  const [transactionCount, setTransactionCount] = useState(1)
  const [inscription, setInscription] = useState('')
  const [inscriptionMode, setInscriptionMode] = useState<'text' | 'hex'>('text')
  const [running, setRunning] = useState(false)

  const { chain } = useNetwork()
  const { address } = useAccount()

  const modal = useModal()
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!address) return modal.setOpen(true)
    try {
      if (chainId !== chain?.id) {
        await switchNetwork({
          chainId
        })
      }

      setRunning(true)
      const data: Hex =
        inscriptionMode === 'text' ? toHex(inscription) : (inscription as Hex)
      const to: Address = transferToSelf ? address : (receiver as Address)
      for (let i = 0; i < transactionCount; i++) {
        try {
          await sendTransaction({ to, data })
        } catch (error) {}
      }
    } catch (error) {
    } finally {
      setRunning(false)
    }
  }
  //localhost:3000/?react-aria5639592163-%3Arl%3A=text
  http: return (
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
          label='交易次数'
          isRequired
          type='number'
          value={transactionCount + ''}
          onValueChange={(value) => setTransactionCount(Number(value))}
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
          {address ? 'Run' : 'Connect Wallet'}
        </Button>
      </form>
    </div>
  )
}
