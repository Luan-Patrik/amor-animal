import { cn } from '@/lib/utils'
import { ArrowRightIcon, XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { buttonVariants } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

interface BaseFormAuthProps {
  header: string
  footerLink?: string
  footerLinkText?: string
  children: ReactNode
}

const BaseFormAuth = (props: BaseFormAuthProps) => {
  return (
    <div className='absolute right-0 top-0 z-50 flex min-h-[100svh] w-full justify-end'>
      <Image
        src='/assets/cat.webp'
        className='fixed left-0 top-0 -z-10 hidden h-full w-1/2 object-cover p-0 brightness-75 drop-shadow-2xl sm:block'
        alt='Logo'
        priority={true}
        placeholder='blur'
        quality={100}
        blurDataURL='data:image/webp;base64,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'
        width={1920}
        height={1080}
      />
      <Card className='flex w-full rounded-none sm:w-1/2 lg:divide-x-2 '>
        <div className='relative w-full'>
          <CardHeader className='text-2xl font-bold'>{props.header}</CardHeader>
          <Link
            href='/'
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' }),
              'absolute right-2 top-2'
            )}
            title='Voltar ao início.'
            aria-label='Voltar ao início.'>
            <XIcon
              aria-hidden='true'
              focusable='false'
              className='h-[1.2rem] w-[1.2rem]'
            />
          </Link>
          <CardContent>{props.children}</CardContent>
          {props.footerLink ? (
            <CardFooter>
              <Link
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'h-auto gap-2 whitespace-pre-wrap p-0.5'
                )}
                href={props.footerLink}>
                {props.footerLinkText}
                <ArrowRightIcon
                  aria-hidden='true'
                  focusable='false'
                  className='h-[1.2rem] w-[1.2rem]'
                />
              </Link>
            </CardFooter>
          ) : null}
        </div>
      </Card>
    </div>
  )
}

export default BaseFormAuth
