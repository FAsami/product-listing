import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/products'

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProducts(),
    select: data => data.products,
  })
}
