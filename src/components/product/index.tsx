import { useMemo, useState } from 'react'
import { Product } from '../../types/product'
import { formatCurrency } from '../../utils/currency'
import DiscountBadge from '../../assets/DiscountBadge'
import {
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
} from '../../assets/icons'
import { useCart } from '../../providers/cart'
import QuickViewModal from './QuickViewModal'

const ProductCard = ({ product }: { product: Product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  const {
    title,
    thumbnail,
    category,
    price: _price,
    discountPercentage,
  } = product

  const {
    cartItems,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    toggleFavourite,
    favourites,
  } = useCart()

  const price = useMemo(() => {
    return {
      original: formatCurrency(_price),
      discount: formatCurrency(_price * (discountPercentage / 100)),
      afterDiscount: formatCurrency(
        _price - _price * (discountPercentage / 100)
      ),
    }
  }, [_price, discountPercentage])

  return (
    <>
      <div className="relative group">
        <div className="absolute inset-0 bg-white rounded-lg -z-10 shadow-none group-hover:shadow-lg transition-all duration-300"></div>
        {discountPercentage > 0 && (
          <div className="absolute top-3 -left-1 z-10">
            <DiscountBadge text={`- ${price.discount}`} />
          </div>
        )}

        <div className="group-hover:bg-[#ebe6e6] bg-[#f5f5f5] rounded-lg relative overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={thumbnail}
            alt={title}
            height={210}
            width={210}
            loading="lazy"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
          <button
            className="absolute z-10 top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => toggleFavourite(product.id)}
          >
            <HeartIcon
              color={favourites.includes(product.id) ? 'red' : 'white'}
            />
          </button>
          <div className="absolute bottom-3 z-10 left-1/2 -translate-x-1/2 w-full flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3">
            {cartItems.some(item => item.product.id === product.id) ? (
              <div className="bg-[#03a629] backdrop-blur-[8px] py-[5px] rounded-md flex items-center justify-between w-full gap-1 px-1.5">
                <button onClick={() => decrementQuantity(product.id)}>
                  <TrashIcon />
                </button>
                <span className="text-sm font-475 text-white">
                  {
                    cartItems.find(item => item.product.id === product.id)
                      ?.quantity
                  }{' '}
                  Added in cart
                </span>
                <button onClick={() => incrementQuantity(product.id)}>
                  <PlusIcon />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="border-white bg-[#FFFFFF4D] backdrop-blur-[8px] py-[5px] border-[1.5px] rounded-md flex items-center justify-center w-full gap-1"
              >
                <ShoppingCartIcon />
                <span className="text-sm font-475 text-white">Add to cart</span>
              </button>
            )}
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="border-white bg-[#FFFFFF4D] backdrop-blur-[8px] py-[5px] border-[1.5px] rounded-md flex items-center justify-center w-full gap-1"
            >
              <EyeIcon />
              <span className="text-sm font-475 text-white">Quick View</span>
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

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  )
}

export default ProductCard
