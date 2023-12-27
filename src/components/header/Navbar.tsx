import { auth } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import UserNavbar from './UserNavbar'

const Navbar = async () => {
  const session = await auth()

  return (
    <header className='sticky inset-0 top-0 z-50 border-b drop-shadow-md backdrop-blur-3xl'>
      <nav className='container flex h-14 items-center justify-between'>
        <Link href='/' title='Voltar para o início'>
          <Image
            src='/assets/logo.webp'
            alt='Logo'
            width={40}
            height={40}
            quality={100}
            priority={true}
          />
        </Link>
        <UserNavbar session={session} />
      </nav>
    </header>
  )
}

export default Navbar
