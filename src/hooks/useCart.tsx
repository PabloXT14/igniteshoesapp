import { useContext } from 'react'

import { CartContext, type CartContextDataProps } from '../contexts/CartContext'

export function useCart(): CartContextDataProps {
  const context = useContext(CartContext)

  return context
}
