import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from './ui/Icons'
import { buttonVariants } from './ui/button'

interface AnimalCardInformationProps {
  id: string
  name: string
  phone: string
}

const AnimalCardInformation = ({
  id,
  name,
  phone
}: AnimalCardInformationProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 very-xs:flex-row very-xs:justify-between'>
      <Link
        href={`/animal/${id}`}
        className={cn(
          buttonVariants({ variant: 'link' }),
          'h-auto overflow-hidden p-0 ring-offset-muted '
        )}>
        <p className='w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold first-letter:uppercase'>
          {name}
        </p>
      </Link>
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
          'h-auto gap-0.5 p-0 leading-relaxed ring-offset-muted'
        )}>
        <Icons.whatsapp className='h-[1.2rem] w-[1.2rem] fill-green-500' />
        {phone}
      </Link>
    </div>
  )
}

export default AnimalCardInformation
