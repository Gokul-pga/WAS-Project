import Image from 'next/image'
import { Inter } from 'next/font/google'
import Loginpg from './auth/login'
import Homepg from './homepg'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Homepg />
    </div>
  )
}
