import { useQuery } from 'react-query'

import productService from "api/productService";

export const useProducts = () => {
  return useQuery('products', productService.products);
}