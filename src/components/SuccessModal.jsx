import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import { useEffect } from 'react'

export default function SuccessModal({ onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose(), 2500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 grid place-content-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center shadow-2xl"
      >
        <FiCheckCircle className="mx-auto text-green-500" size={60} />
        <h3 className="mt-4 text-2xl font-bold text-accent">¡Listo! Tu pedido ya está cocinándose</h3>
        <p className="text-gray-600">Te llegará un mail con los datos de entrega.</p>
      </motion.div>
    </motion.div>
  )
}