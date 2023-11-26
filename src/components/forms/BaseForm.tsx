'use client'

import { ReactNode } from 'react'
import { Button, buttonVariants } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface BaseFormProps {
  header: string
  submitText: string
  footerText: string
  footerLink: string
  footerLinkText?: string
  onSubmit: () => void
  children: ReactNode
}

function BaseForm(props: BaseFormProps) {
  return (
    <div className='flex justify-end min-h-[100svh]'>
      <Image
        src='/assets/cat.webp'
        className='absolute top-0 drop-shadow-2xl p-0 w-full object-cover left-0 h-full -z-10 brightness-75'
        alt='Logo'
        width={1920}
        height={1080}
      />
      <Card className='w-1/2 flex lg:divide-x-2 rounded-none'>
        <div className='w-full'>
          <CardHeader className='text-2xl font-bold'>{props.header}</CardHeader>
          <CardContent>
            <form className='space-y-2 flex-grow' onSubmit={props.onSubmit}>
              {props.children}
              <Button type='submit' className='w-full' variant='default'>
                {props.submitText}
              </Button>
            </form>
          </CardContent>
          <CardFooter className='gap-2 flex flex-wrap break-words'>
            <p>{props.footerText}</p>
            <Link
              className={cn(buttonVariants({ variant: 'link' }), 'p-0 h-0')}
              href={props.footerLink}>
              {props.footerLinkText}
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}

export default BaseForm
