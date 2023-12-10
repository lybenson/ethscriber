import Link from 'next/link'
import ConnectButton from './ConnectButton'
import ThemeSwitcher from './ThemeSwitcher'
import GithubIcon from './icons/Github'

export default function Header() {
  return (
    <header className='flex justify-between p-8 sticky top-0 items-center shadow-sm'>
      <div className='flex text-3xl font-bold bg-clip-text text-transparent bg-gradient animate-gradient bg-[-100%] bg-[length:300%_300%]'>
        ETHScriber
      </div>

      <div className='flex gap-2'>
        <ConnectButton />
        <Link
          href='https://github.com/lybenson/ethscriber'
          target='_blank'
          className='flex items-center'
        >
          <GithubIcon width={'2rem'} />
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
