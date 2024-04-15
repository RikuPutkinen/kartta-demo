import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const baseUrl = '/api/markers'

export function useLocationQuery() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () => axios.get(baseUrl).then(res => res.data),
    retry: false,
  })
}
