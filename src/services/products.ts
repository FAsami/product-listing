import { axiosInstance } from '../lib/axios'
import { ProductResponse } from '../types/product'

export const productService = {
  getProducts: async (): Promise<ProductResponse> => {
    const { data } = await axiosInstance.get('/products')
    return data
  },
}
