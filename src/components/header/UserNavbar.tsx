'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Avatar } from '../ui/avatar'
import { User2Icon } from 'lucide-react'
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
              className='group relative flex w-full min-w-[4rem] max-w-[6rem] items-center justify-between overflow-hidden rounded-full px-0 py-1 sm:max-w-[8rem]'
              variant='outline'
              size='default'>
              <p className='overflow-hidden text-ellipsis px-1'>
                {session?.user.name}
              </p>
              <Avatar className='-mr-[0.05rem] flex aspect-square h-10 w-10 scale-90 items-center justify-center rounded-full bg-input transition-all group-data-[state="open"]:scale-100'>
                <User2Icon
                  aria-hidden='true'
                  focusable='false'
                  className='h-[1.2rem] w-[1.2rem]'
                />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link href=''>Meus animais</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>2</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='font-bold text-destructive'
              onClick={async () => await signOut()}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='gap-2'>
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'default' })
            )}
            href='/entrar'>
            Entrar
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'default' })
            )}
            href='/cadastrar'>
            Cadastrar
          </Link>
        </div>
      )}
    </>
  )
}

export default UserNavbar
