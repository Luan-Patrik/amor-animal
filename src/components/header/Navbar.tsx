import { auth } from '@/lib/auth'
import UserNavbar from './UserNavbar'
import Image from 'next/image'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className='sticky inset-x-0 top-0 z-50 border-b bg-background drop-shadow-md'>
      <nav className='container flex h-14 items-center justify-between'>
        <Image
          src='/assets/logo.webp'
          alt='Logo'
          width={40}
          height={40}
          quality={100}
          priority={true}
        />
        <UserNavbar session={session} />
      </nav>
    </header>
  )
}

export default Navbar
