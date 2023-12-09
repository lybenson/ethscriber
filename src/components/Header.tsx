import ConnectButton from './ConnectButton'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  return (
    <header className='flex justify-between p-8 sticky top-0 items-center shadow-sm'>
      <div className='flex text-3xl font-bold bg-clip-text text-transparent bg-gradient animate-gradient bg-[-100%] bg-[length:300%_300%]'>
        ETHScriber
      </div>

      <div className='flex gap-2'>
        <ConnectButton />
        <ThemeSwitcher />
      </div>
    </header>
  )
}
