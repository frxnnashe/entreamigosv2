import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createSale } from '../services/sales'
import { toast } from 'react-hot-toast'
import { FiCheckCircle } from 'react-icons/fi'

function SuccessModal({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 grid place-content-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <FiCheckCircle className="mx-auto text-green-500" size={60} />
        <h3 className="mt-4 text-2xl font-bold text-accent">¡Pedido confirmado!</h3>
        <p className="text-gray-600">Te contactaremos por WhatsApp para coordinar.</p>
        <button
          onClick={onClose}
          className="mt-4 bg-primary text-white px-4 py-2 rounded"
        >
          Seguir comprando
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function Cart() {
  const {
    cart,
    removeFromCart,
    incrementQty,
    decrementQty,
    total,
    clearCart,
    applyDiscount,
  } = useCart()

  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [code, setCode] = useState('')
  const [msg, setMsg] = useState('')

  const handlePay = (method) => {
    createSale(
      [...cart, { name: `Método: ${method}`, price: 0, qty: 1 }],
      total,
    )
    clearCart()
    setShowSuccess(true)
  }

  const tryCode = () => {
    const ok = applyDiscount(code)
    ok ? setMsg('Cupón aplicado 🎉') : setMsg('Cupón inválido')
  }

  if (cart.length === 0)
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center fade-in">
        <h2 className="text-2xl font-bold text-accent">Tu carrito está vacío</h2>
        <button
          onClick={() => navigate('/')}
          className="text-primary underline mt-4 inline-block"
        >
          Seguir comprando
        </button>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 fade-in">
      <h2 className="text-3xl font-bold text-accent mb-6">Tu Carrito</h2>

      <div className="space-y-4">
        {cart.map((p) => (
          <motion.div
            key={p.id}
            layout
            className="card-hover bg-white rounded-xl shadow p-4 flex items-center gap-4"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600">${p.price} c/u</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decrementQty(p.id)}
                className="px-2 py-1 bg-gray-100 rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{p.qty}</span>
              <button
                onClick={() => incrementQty(p.id)}
                className="px-2 py-1 bg-gray-100 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(p.id)}
              className="text-red-500 underline"
            >
              Quitar
            </button>
          </motion.div>
        ))}
      </div>

      {/* Cupón */}
      <div className="mt-6 flex items-center gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Cupón (ej. BUDI10)"
          className="px-3 py-2 border rounded w-40"
        />
        <button
          onClick={tryCode}
          className="bg-secondary px-3 py-2 rounded hover:brightness-110"
        >
          Aplicar
        </button>
        {msg && <p className="text-xs text-gray-600">{msg}</p>}
      </div>

      {/* Total y métodos */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <span className="text-xl font-bold">Total: ${total.toFixed(2)}</span>
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePay('Mercado Pago')}
            className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-orange-500 transition"
          >
            Pagar con Mercado Pago
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handlePay('Efectivo')}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800 transition"
          >
            Pagar en efectivo
          </motion.button>
        </div>
      </div>

      {showSuccess && <SuccessModal onClose={() => navigate('/')} />}
    </div>
  )
}