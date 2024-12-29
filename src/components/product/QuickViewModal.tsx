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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-white rounded-lg p-6 max-w-3xl w-full mx-4 z-10">
        <button
          onClick={onClose}
          className="absolute right-2 top-0 text-brand-dark-900 hover:text-gray-700 text-4xl"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-575 text-brand-dark-900 mb-2">
              {product.title}
            </h2>
            <p className="text-brand-dark-700 mb-4 first-letter:capitalize">
              {product.category}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-475 text-brand-primary-500">
                {formatCurrency(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-575">Brand:</span>
                <span>{product.brand}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-575">Rating:</span>
                <span>{product.rating} / 5</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-575">Stock:</span>
                <span>{product.stock} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
