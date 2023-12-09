import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradient: 'linear-gradient(90deg, #711DB0, #C21292, #EF4040, #FFA732)'
      },
      animation: {
        gradient: 'gradient 2s infinite alternate-reverse'
      },
      keyframes: {
        gradient: {
          '0%': {
            backgroundPosition: '0'
          },
          '100%': {
            backgroundPosition: '100%'
          }
        }
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'eths'
    })
  ]
}
export default config
