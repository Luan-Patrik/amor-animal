'use client'

import { AnimalRequest } from '@/lib/validators/AnimalValidator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { MoreVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { useToast } from './ui/use-toast'

interface DeleteAnimalPostProps {
  id: string
}

const DeleteAnimalPost = ({ id }: DeleteAnimalPostProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { toast } = useToast()
  const { mutate: deleteAnimal } = useMutation({
    mutationKey: ['delete-animal-post'],
    mutationFn: async ({ id }: AnimalRequest) => {
      const payload: AnimalRequest = {
        id
      }

      const { data } = await axios.delete('/api/deleteAnimal', {
        data: payload
      })
      return data
    },

    onSuccess: () => {
      queryClient.refetchQueries()
      router.push('/')
      return toast({
        title: 'Sucesso.',
        description: 'Post apagado com sucesso.',
        variant: 'default'
      })
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast({
          title: 'Algo deu errado.',
          description: error.response
            ? error.response.data
            : 'Ops! Algo deu errado. Por favor, tente novamente mais tarde.',
          variant: 'destructive'
        })
      }
    }
  })

  const onDelete = () => {
    deleteAnimal({
      id
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-fit w-fit p-0 ring-offset-muted'>
          <MoreVertical className='' aria-hidden='true' focusable='false' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={onDelete}
          className='font-bold text-destructive'>
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DeleteAnimalPost
