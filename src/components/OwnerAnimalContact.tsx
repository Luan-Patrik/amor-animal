import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'

interface OwnerAnimalContactProps {
  nickname: string
  phone: string
}

const OwnerAnimalContact = ({ nickname, phone }: OwnerAnimalContactProps) => {
  return (
    <Card className='h-fit w-full lg:sticky lg:top-[4.6rem] lg:w-[28rem]'>
      <CardHeader className='px-2'>
        <CardTitle>Entre em contato</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col px-2 text-base font-bold'>
        <div className='inline-flex gap-2'>
          <span className='whitespace-nowrap'>Dono (a):</span>
          <Link
            href={`/${nickname}`}
            className={cn(
              buttonVariants({ variant: 'link' }),
              'h-auto overflow-hidden p-0'
            )}>
            <p className='overflow-hidden text-ellipsis'>{nickname}</p>
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
              'h-auto gap-0.5 p-0'
            )}>
            {phone}
          </Link>
        </div>
      </CardContent>
      <CardFooter className='justify-center px-2 text-center font-bold text-muted-foreground'>
        “Ajude esse pet a encontrar seu lar.”
      </CardFooter>
    </Card>
  )
}

export default OwnerAnimalContact
