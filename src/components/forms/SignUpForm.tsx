'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import BaseFormAuth from './BaseFormAuth'
import { SignUpRequest, SignUpValidator } from '@/lib/validators/AuthValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Button } from '../ui/button'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '../ui/use-toast'
import { ChangeEvent, useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Mask from '../Mask'

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const form = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onPhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const maskedPhone = Mask(event.target.value, '(##) # ####-####', 'numbers')
    form.setValue('phone', maskedPhone)
  }

  const { mutate: SignUp } = useMutation({
    mutationFn: async ({
      name,
      nickname,
      email,
      phone,
      password,
      confirmPassword
    }: SignUpRequest) => {
      setIsLoading(true)
      const payload: SignUpRequest = {
        name,
        nickname,
        email,
        phone,
        password,
        confirmPassword
      }

      const { data } = await axios.post('/api/signup', payload)

      return data
    },
    onSuccess: async (data, { email, password }: SignUpRequest) => {
      await signIn('credentials', {
        email,
        password
      })
      return toast({
        title: 'Sucesso.',
        description: data ? data : 'Cadastro efetuado com sucesso.',
        variant: 'default'
      })
    },
    onError: (error) => {
      setIsLoading(false)
      if (error instanceof AxiosError) {
        toast({
          title: 'Algo deu errado.',
          description: error.response
            ? error.response.data
            : 'Tente novamente mais tarde.',
          variant: 'destructive'
        })
      }
    }
  })

  const onSubmit: SubmitHandler<SignUpRequest> = async () => {
    const payload: SignUpRequest = {
      name: form.getValues('name'),
      nickname: form.getValues('nickname'),
      email: form.getValues('email'),
      phone: form.getValues('phone').replace(/\D/g, ''),
      password: form.getValues('password'),
      confirmPassword: form.getValues('confirmPassword')
    }
    SignUp(payload)
  }

  return (
    <BaseFormAuth
      header='Criar conta'
      footerLink='/entrar'
      footerLinkText='Já possui uma conta?'>
      <Form {...form}>
        <form
          className='flex-grow space-y-2'
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    id='name'
                    type='text'
                    autoComplete='name'
                    {...form.register('name')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apelido</FormLabel>
                <FormControl>
                  <Input
                    id='nickname'
                    type='text'
                    autoComplete='nickname'
                    {...form.register('nickname')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    {...form.register('email')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input
                    id='phone'
                    type='text'
                    autoComplete='tel'
                    {...form.register('phone')}
                    {...field}
                    onChange={onPhoneChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='space-y-2 lg:flex lg:flex-row lg:space-x-2 lg:space-y-0'>
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
                      {...form.register('password')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      id='confirmPassword'
                      type='password'
                      {...form.register('confirmPassword')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            type='submit'
            className='w-full'
            variant='default'>
            {isLoading ? (
              <Loader2Icon className='h-[1.2rem] w-[1.2rem] animate-spin' />
            ) : (
              'Criar conta'
            )}
          </Button>
        </form>
      </Form>
    </BaseFormAuth>
  )
}

export default SignUpForm
