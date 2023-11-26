'use client'

import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import BaseForm from './BaseForm'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { SignUpRequest, SignUpValidator } from '@/lib/validators/AuthValidator'
import { zodResolver } from '@hookform/resolvers/zod'

const SignUpForm = () => {
  const form = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      name: '',
      nickname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <BaseForm
        header='Criar conta'
        submitText='Criar conta'
        footerText='Já possui uma conta?'
        footerLink='/entrar'
        footerLinkText='Entrar na conta'
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input id='name' type='text' autoComplete='on' {...field} />
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
                <Input id='nickname' type='text' autoComplete='on' {...field} />
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
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='sm:flex sm:flex-row sm:space-x-2'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input id='password' type='password' {...field} />
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
                  <Input id='confirmPassword' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </BaseForm>
    </Form>
  )
}

export default SignUpForm
