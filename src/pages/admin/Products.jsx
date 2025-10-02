import { useEffect, useState } from 'react'
import { createProduct, deleteProduct, fetchProducts } from '../../services/products'

export default function Products() {
  const [list, setList] = useState([])
  const [form, setForm] = useState({ name: '', desc: '', price: '' })
  const [file, setFile] = useState(null)

  useEffect(() => {
    load()
  }, [])

  const load = async () => setList(await fetchProducts())

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return alert('Subí una imagen')
    await createProduct(form, file)
    setForm({ name: '', desc: '', price: '' })
    setFile(null)
    load()
  }

  const handleDelete = async (prod) => {
    if (!confirm('¿Seguro?')) return
    await deleteProduct(prod.id, prod.imageUrl)
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">Gestionar Productos</h1>

      <form onSubmit={handleSubmit} className="mb-8 max-w-xl space-y-4">
        <input
          placeholder="Nombre"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          placeholder="Descripción"
          required
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="file"
          required
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
        />
        <button className="bg-primary text-white px-4 py-2 rounded">Guardar</button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="h-32 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.desc}</p>
            <p className="font-bold text-primary">${p.price}</p>
            <button
              onClick={() => handleDelete(p)}
              className="mt-2 text-sm text-red-500 underline"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}