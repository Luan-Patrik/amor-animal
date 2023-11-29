'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Avatar } from '../ui/avatar'
import { User2 } from 'lucide-react'
import { Button, buttonVariants } from '../ui/button'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface UserNavbarProps {
  session: Session | null
}

const UserNavbar = ({ session }: UserNavbarProps) => {
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className='group h-auto min-w-[4rem] max-w-[6rem] rounded-full w-full relative sm:max-w-[8rem] overflow-hidden flex justify-between items-center p-0'
              variant={'outline'}>
              <p className='overflow-hidden text-ellipsis px-1'>
                {session?.user.name}
              </p>
              <Avatar className='aspect-square p-2 rounded-full scale-90 h-auto w-auto group-data-[state="open"]:scale-100 transition-all bg-input'>
                <User2 className='w-[1.2rem] h-[1.2rem]' />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>1</DropdownMenuItem>
            <DropdownMenuItem>2</DropdownMenuItem>
            <DropdownMenuItem>3</DropdownMenuItem>
            <DropdownMenuItem>4</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='text-destructive font-bold'
              onClick={async () => await signOut()}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div>
          <Link
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            href='/entrar'>
            Entrar
          </Link>
          <Link
            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            href='/cadastrar'>
            Cadastrar
          </Link>
        </div>
      )}
    </>
  )
}

export default UserNavbar
