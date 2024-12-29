import { useMemo } from 'react'
import { Product } from '../../types/product'
import { formatCurrency } from '../../utils/currency'
import DiscountBadge from '../../assets/DiscountBadge'
import {
  ShoppingCartIcon,
  EyeIcon,
  HeartIcon,
} from '@heroicons/react/24/outline'

const ProductCard = ({ product }: { product: Product }) => {
  const {
    title,
    thumbnail,
    category,
    price: _price,
    discountPercentage,
  } = product
  console.log(product)

  const price = useMemo(() => {
    return {
      original: formatCurrency(_price),
      discount: formatCurrency(_price * (discountPercentage / 100)),
      afterDiscount: formatCurrency(
        _price - _price * (discountPercentage / 100)
      ),
    }
  }, [_price, discountPercentage])
  console.log(price)

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10">
        <button className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors">
          <HeartIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="absolute top-3 -left-1 z-10">
        <DiscountBadge text={`- ${price.discount}`} />
      </div>

      <div className="bg-[#ebe6e6] rounded-lg relative overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={thumbnail}
          alt={title}
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white text-gray-800 px-8 py-2 rounded-md w-[80%] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            <ShoppingCartIcon className="w-5 h-5" />
            Add to Cart
          </button>
          <button className="bg-white text-gray-800 px-8 py-2 rounded-md w-[80%] hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
            <EyeIcon className="w-5 h-5" />
            Quick View
          </button>
        </div>
      </div>

      <div className="p-2">
        <div className="text-brand-dark-700 text-sm first-letter:capitalize">
          {category}
        </div>
        <div className="text-brand-dark-900 text-base font-575">{title}</div>
        <div className="flex gap-2 items-center">
          <div className="text-brand-primary-500 text-xl font-475">
            {price.afterDiscount}
          </div>
          <div className="text-gray-500 line-through text-sm">
            {price.original}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
