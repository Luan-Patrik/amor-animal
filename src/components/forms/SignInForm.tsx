'use client'

import { SignInRequest, SignInValidator } from '@/lib/validators/AuthValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import BaseFormAuth from './BaseFormAuth'

const SignInForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<SignInRequest>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutate: SignIn } = useMutation({
    mutationFn: async ({ email, password }: SignInRequest) => {
      setIsLoading(true)
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res?.error) {
        setIsLoading(false)
        return toast({
          title: 'Algo deu errado.',
          description: res.error,
          variant: 'destructive'
        })
      } else {
        router.push('/')
        router.refresh()
        return toast({
          title: 'Sucesso.',
          description: 'Entrou com sucesso.',
          variant: 'default'
        })
      }
    }
  })

  const onSubmit: SubmitHandler<SignInRequest> = async () => {
    const payload: SignInRequest = {
      email: form.getValues('email'),
      password: form.getValues('password')
    }
    SignIn(payload)
  }

  return (
    <BaseFormAuth
      header='Entrar na conta'
      footerLink='/cadastrar'
      footerLinkText='Não possui uma conta?'>
      <Form {...form}>
        <form
          className='flex-grow space-y-2'
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    id='email'
                    type='email'
                    autoComplete='email'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    id='password'
                    type='password'
                    {...field}
                    autoComplete='current-password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            disabled={isLoading}
            type='submit'
            className='w-full'
            variant='default'>
            {isLoading ? (
              <Loader2Icon
                aria-hidden='true'
                focusable='false'
                className='h-[1.2rem] w-[1.2rem] animate-spin'
              />
            ) : (
              'Entrar conta'
            )}
          </Button>
        </form>
      </Form>
    </BaseFormAuth>
  )
}

export default SignInForm
