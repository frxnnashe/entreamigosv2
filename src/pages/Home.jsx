import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../services/products";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center text-center px-4 fade-in">
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/src/assets/fondo.webp)" }}
        >
          <div className="absolute inset-0 bg-black/40" />{" "}
          {/* overlay oscuro */}
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-white z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold drop-shadow">
            Budines artesanales
          </h1>
          <p className="mt-2 text-lg drop-shadow">Hechos con amor, cada día.</p>
          <Link
            to="#productos"
            className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-orange-500 transition"
          >
            Ver nuestros sabores
          </Link>
        </motion.div>
      </section>

      {/* Galería */}
      <section id="productos" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-accent mb-8">
          Nuestros Budines
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
