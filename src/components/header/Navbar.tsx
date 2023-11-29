import { auth } from '@/lib/auth'
import UserNavbar from './UserNavbar'
import Image from 'next/image'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className='sticky inset-x-0 top-0 z-50 border-b drop-shadow-md bg-background py-2'>
      <nav className='container flex justify-between items-center'>
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
