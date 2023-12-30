import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface OwnerAnimalContactProps {
  nickname: string
  phone: string
}

const OwnerAnimalContact = ({ nickname, phone }: OwnerAnimalContactProps) => {
  return (
    <Card className='h-fit overflow-x-auto lg:sticky lg:top-[4.6rem] lg:w-[28rem]'>
      <CardHeader className='px-2'>
        <CardTitle>Entre em contato</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col px-2 text-base font-bold'>
        <div className='inline-flex flex-wrap gap-2'>
          <span className='whitespace-nowrap'>Dono (a):</span>
          <Link
            href={`/${nickname}`}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'h-auto p-0 text-foreground'
            )}>
            {nickname}
          </Link>
        </div>
        <div className='inline-flex flex-wrap gap-2'>
          <span>Telefone:</span>
          <Link
            href={`https://api.whatsapp.com/send?phone=55${phone.replace(
              /\D/g,
              ''
            )}`}
            target='_blank'
            referrerPolicy='no-referrer'
            rel='noopener noreferrer'
            className={cn(
              buttonVariants({ variant: 'link' }),
              'h-auto p-0 text-foreground'
            )}>
            {phone}
          </Link>
        </div>
      </CardContent>
      <CardFooter className='justify-center px-2 text-center font-bold text-muted-foreground'>
        <span>“Ajude esse pet a encontrar seu lar.”</span>
      </CardFooter>
    </Card>
  )
}

export default OwnerAnimalContact
