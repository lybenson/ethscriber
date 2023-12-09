'use client'

import { Switch } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import { SunIcon } from './icons/Sun'
import { MoonIcon } from './icons/Moon'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <Switch
      onValueChange={(isSelected) =>
        isSelected ? setTheme('dark') : setTheme('light')
      }
      defaultSelected={theme === 'light' ? false : true}
      size='lg'
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
  )
}
