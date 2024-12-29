import { createContext, useContext, useReducer } from 'react'
import { Product } from '../types/product'

type CartItem = {
  product: Product
  quantity: number
}

type CartState = {
  items: CartItem[]
  favourites: number[]
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'INCREMENT_QUANTITY'; payload: number }
  | { type: 'DECREMENT_QUANTITY'; payload: number }
  | { type: 'TOGGLE_FAVOURITE'; payload: number }
type CartContextType = {
  state: CartState
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  incrementQuantity: (productId: number) => void
  decrementQuantity: (productId: number) => void
  toggleFavourite: (productId: number) => void
  cartItems: CartItem[]
  favourites: number[]
  cartTotal: number
  numberOfItems: number
}

const initialState: CartState = {
  items: [],
  favourites: [],
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      )

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += 1
        return { ...state, items: updatedItems }
      }

      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      }
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload),
      }
    }

    case 'INCREMENT_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    }

    case 'DECREMENT_QUANTITY': {
      return {
        ...state,
        items: state.items
          .map(item =>
            item.product.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter(item => item.quantity > 0),
      }
    }
    case 'TOGGLE_FAVOURITE': {
      return {
        ...state,
        favourites: state.favourites.includes(action.payload)
          ? state.favourites.filter(id => id !== action.payload)
          : [...state.favourites, action.payload],
      }
    }

    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const cartItems = state.items
  const favourites = state.favourites
  const numberOfItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  )
  const cartTotal = state.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  )

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const incrementQuantity = (productId: number) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: productId })
  }

  const decrementQuantity = (productId: number) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: productId })
  }

  const toggleFavourite = (productId: number) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: productId })
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        toggleFavourite,
        cartItems,
        favourites,
        cartTotal,
        numberOfItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
