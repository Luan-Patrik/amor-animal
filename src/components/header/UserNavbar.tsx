'use client'

import { cn } from '@/lib/utils'
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu'
import { ChevronUp, User2Icon } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Avatar } from '../ui/avatar'
import { Button, buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

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
          <DropdownMenuContent className='w-[15rem]' align='end' >
            <DropdownMenuArrow className='fill-input'></DropdownMenuArrow>
            <DropdownMenuLabel>{session.user.nickname}</DropdownMenuLabel>
            <DropdownMenuLabel className='overflow-x-hidden break-words text-sm font-normal'>
              {session.user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/${session.user.nickname}`}>Meus animais</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/animais/1'>Ver animais</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/cadastrar-animal'>Cadastrar animal</Link>
            </DropdownMenuItem>
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
