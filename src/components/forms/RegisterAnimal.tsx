'use client'

import {
  RegisterAnimalRequest,
  RegisterAnimalValidator
} from '@/lib/validators/RegisterAnimalValidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { fileToBase64 } from '../ConvertBase64'
import { ImageInputFileDropzone } from '../ImageInputFileDropzone'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const RegisterAnimal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const [file, setFile] = useState<File[]>([])
  const [base64Files, setBase64Files] = useState<string[]>([])

  const form = useForm<RegisterAnimalRequest>({
    resolver: zodResolver(RegisterAnimalValidator),
    defaultValues: {
      name: '',
      description: '',
      files: []
    }
  })

  const onFileChange = async (selectedFile: File[]) => {
    setFile(selectedFile)

    try {
      const base64Data = await Promise.all(
        selectedFile.map(async (file) => {
          return await fileToBase64(file)
        })
      )
      const filteredBase64Files = base64Data.filter((data) => data !== null)
      setBase64Files(filteredBase64Files as string[])
    } catch (error) {
      console.error('Erro ao converter arquivo para base64', error)
      setBase64Files([])
    }
  }

  const { mutate: RegisterAnimal } = useMutation({
    mutationFn: async ({ name, description, files }: RegisterAnimalRequest) => {
      setIsLoading(true)
      const payload: RegisterAnimalRequest = {
        name,
        description,
        files
      }

      const { data } = await axios.post('/api/registerAnimal', payload)
      return data
    },
    onSuccess: () => {
      queryClient.refetchQueries()
      router.push('/')
    },
    onError: () => {
      setIsLoading(false)
    }
  })

  const onSubmit: SubmitHandler<RegisterAnimalRequest> = () => {
    const payload: RegisterAnimalRequest = {
      name: form.getValues('name'),
      description: form.getValues('description'),
      files: base64Files
    }
    RegisterAnimal(payload)
  }

  return (
    <div className='container'>
      <Card className='rounded-md'>
        <CardHeader className='text-2xl font-bold'>Divulgar animal</CardHeader>
        <CardContent>
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
                      <Input id='name' {...form.register('name')} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        id='description'
                        className='min-h-[14rem]'
                        {...form.register('description')}
                        {...field}
                      />
                    </FormControl>
                    <div
                      className={`flex ${
                        form.formState.errors.description?.message
                          ? 'justify-between'
                          : 'justify-end'
                      } gap-2`}>
                      <FormMessage className='block w-full flex-1' />
                      <p
                        className={`font-normal ${
                          form.getValues('description').length > 2000
                            ? 'text-destructive'
                            : 'text-foreground'
                        }`}>
                        {form.getValues('description').length}
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='files'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInputFileDropzone
                        dropzoneOptions={{
                          accept: { 'image/*': [] },
                          multiple: true,
                          maxFiles: 5,
                          minSize: 1,
                          maxSize: 128000
                        }}
                        width={200}
                        height={200}
                        value={file}
                        onChange={(file) => {
                          onFileChange(file)
                          form.setValue('files', file)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type='submit' className='w-full'>
                {isLoading ? (
                  <Loader2Icon
                    aria-hidden='true'
                    focusable='false'
                    className='h-[1.2rem] w-[1.2rem] animate-spin'
                  />
                ) : (
                  'Cadastrar animal'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
export default RegisterAnimal
