import { ExtendedDetailAnimal } from '@/types/DetailAnimal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDetailAnimal = (id: string) => {
  return useQuery({
    queryKey: ['detailAnimal', id],
    queryFn: async () => {
      const { data } = await axios.get('/api/detailAnimal', {
        params: {
          id
        }
      })

      return data as ExtendedDetailAnimal
    }
  })
}
