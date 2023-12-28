import { AnimalRequest } from '@/lib/validators/AnimalValidator'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { MoreVertical } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

interface DeleteAnimalPostProps {
  id: string
}

const DeleteAnimalPost = ({ id }: DeleteAnimalPostProps) => {
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
