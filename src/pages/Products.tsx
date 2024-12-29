import ProductCard from '../components/product'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { useProducts } from '../hooks/products'

const Products = () => {
  const { data: products, isLoading, error } = useProducts()
  if (isLoading) return <ProductSkeleton />
  if (error)
    return <div className="text-neutral-700">Error: {error.message}</div>

  if (!products?.length) {
    return <div>Product is not available !</div>
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products
