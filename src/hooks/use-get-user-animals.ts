import { ExtendedUserAnimals } from '@/types/Animals'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetUserAnimals = (
  nickname: string,
  page: string | number,
  postsPerPage: string | number
) => {
  return useQuery({
    queryKey: ['animals', nickname, page, postsPerPage],
    queryFn: async () => {
      const { data } = await axios.get('/api/userAnimals', {
        params: {
          nickname,
          page,
          postsPerPage
        }
      })

      return data as ExtendedUserAnimals
    }
  })
}
