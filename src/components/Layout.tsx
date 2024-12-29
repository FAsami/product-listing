import { ShoppingCartIcon } from '../assets/icons'
import { useCart } from '../providers/cart'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { numberOfItems } = useCart()
  return (
    <div>
      {children}
      <div className="fixed bottom-4 right-4 bg-brand-primary-500 rounded-full p-2">
        <ShoppingCartIcon size={36} color="#fff" />
        {numberOfItems > 0 && (
          <span className="absolute top-0 left-0 bg-brand-dark-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {numberOfItems}
          </span>
        )}
      </div>
    </div>
  )
}

export default Layout
