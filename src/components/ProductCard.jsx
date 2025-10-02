import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="card-hover bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-48 w-full object-cover rounded-t-2xl"
      />
      <div className="p-4">
        <h3 className="font-semibold text-accent">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.desc}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Agregar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
