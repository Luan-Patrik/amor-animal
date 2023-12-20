import { ExtendedDetailAnimal } from '@/types/DetailAnimal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetDetailAnimal = (name: string, id: string) => {
  return useQuery({
    queryKey: ['detailAnimal', name, id],
    queryFn: async () => {
      const { data } = await axios.get('/api/detailAnimal', {
        params: {
          name,
          id
        }
      })

      return data as ExtendedDetailAnimal
    }
  })
}
