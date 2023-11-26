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
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInRequest, SignInValidator } from '@/lib/validators/AuthValidator'

const SignInForm = () => {
  const form = useForm<SignInRequest>({
    resolver: zodResolver(SignInValidator),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = () => {}

  return (
    <Form {...form}>
      <BaseForm
        header='Entrar na conta'
        submitText='Entrar na conta'
        footerText='Não possui uma conta?'
        footerLink='/cadastrar'
        footerLinkText='Criar conta'
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
              <FormMessage />
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
      </BaseForm>
    </Form>
  )
}

export default SignInForm
