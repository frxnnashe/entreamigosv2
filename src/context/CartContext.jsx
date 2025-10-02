import { createContext, useContext, useReducer, useState } from 'react'

const CartContext = createContext()

const initialState = []

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const exist = state.find((p) => p.id === action.payload.id)
      if (exist) {
        return state.map((p) =>
          p.id === action.payload.id ? { ...p, qty: p.qty + 1 } : p,
        )
      }
      return [...state, { ...action.payload, qty: 1 }]
    case 'REMOVE':
      return state.filter((p) => p.id !== action.payload)
    case 'INCREMENT':
      return state.map((p) =>
        p.id === action.payload ? { ...p, qty: p.qty + 1 } : p,
      )
    case 'DECREMENT':
      return state.map((p) =>
        p.id === action.payload && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p,
      )
    case 'CLEAR':
      return initialState
    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [discount, setDiscount] = useState(0) // 0-100

  const applyDiscount = (code) => {
    const upper = code.toUpperCase()
    if (upper === 'BUDI10') setDiscount(10)
    else if (upper === 'BUDI20') setDiscount(20)
    else return false
    return true
  }

  const [cart, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product) => dispatch({ type: 'ADD', payload: product })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', payload: id })
  const incrementQty = (id) => dispatch({ type: 'INCREMENT', payload: id })
  const decrementQty = (id) => dispatch({ type: 'DECREMENT', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const rawTotal = cart.reduce((acc, p) => acc + p.price * p.qty, 0)
  const total = rawTotal * (1 - discount / 100)

  return (
    <CartContext.Provider
      value={{
        cart,
        discount,
        applyDiscount,
        addToCart,
        removeFromCart,
        incrementQty,
        decrementQty,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)