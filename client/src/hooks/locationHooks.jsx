import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useLocationQuery() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: () =>
      axios.get('http://localhost:3001/markers').then(res => res.data),
  })
}
