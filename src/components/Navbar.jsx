import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { cart } = useCart()
  const qty = cart.reduce((acc, p) => acc + p.qty, 0)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-accent">
          Budines & Delicias
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative text-primary"
            aria-label="carrito"
          >
            <FiShoppingCart size={24} />
            {qty > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 grid place-content-center"
              >
                {qty}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}