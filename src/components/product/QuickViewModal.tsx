import { useEffect } from 'react'
import { Product } from '../../types/product'
import { formatCurrency } from '../../utils/currency'

interface QuickViewModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  if (!isOpen) return null

  return (
    <QuickViewModalContent
      product={product}
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}

export default QuickViewModal

const QuickViewModalContent = ({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) => {
  const discountedPrice =
    product.price - product.price * (product.discountPercentage / 100)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-3xl z-10">
        <button
          onClick={onClose}
          className="absolute right-2 top-1 sm:right-3 sm:top-2 text-brand-dark-900 hover:text-gray-700 text-3xl sm:text-4xl"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-575 text-brand-dark-900 mb-2">
              {product.title}
            </h2>
            <p className="text-sm sm:text-base text-brand-dark-700 mb-3 sm:mb-4 first-letter:capitalize">
              {product.category}
            </p>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl font-475 text-brand-primary-500">
                {formatCurrency(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm sm:text-base text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              {product.description}
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-575">Brand:</span>
                <span className="text-sm sm:text-base">{product.brand}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-575">Rating:</span>
                <span className="text-sm sm:text-base">
                  {product.rating} / 5
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-575">Stock:</span>
                <span className="text-sm sm:text-base">
                  {product.stock} units
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
