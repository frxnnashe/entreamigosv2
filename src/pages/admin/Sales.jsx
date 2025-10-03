import { useEffect, useState } from 'react'
import {
  fetchSales,
  fetchSalesByRange,
  deleteSale,
  updateSale,
} from '../../services/sales'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi'

const PERIODS = {
  todos: 'Todos',
  hoy: 'Hoy',
  semana: 'Esta semana',
  mes: 'Este mes',
}

export default function Sales() {
  const [sales, setSales] = useState([])
  const [period, setPeriod] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // id que se está editando
  const [draft, setDraft] = useState({}) // datos temporales mientras editas

  useEffect(() => {
    load()
  }, [period])

  const load = async () => {
    setLoading(true)
    try {
      let list = []
      if (period === 'todos') {
        list = await fetchSales()
      } else {
        const { start, end } = calcRange(period)
        list = await fetchSalesByRange(start, end)
      }
      setSales(list)
    } catch (e) {
      toast.error('Error al cargar ventas')
    } finally {
      setLoading(false)
    }
  }

  // Calcula inicio/fin según período
  const calcRange = (p) => {
    const now = new Date()
    let start = new Date(now)
    let end = new Date(now)

    if (p === 'hoy') {
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
    } else if (p === 'semana') {
      start = new Date(now.setDate(now.getDate() - now.getDay()))
      start.setHours(0, 0, 0, 0)
      end = new Date(now.setDate(start.getDate() + 6))
      end.setHours(23, 59, 59, 999)
    } else if (p === 'mes') {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
    }

    return { start: Timestamp.fromDate(start), end: Timestamp.fromDate(end) }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Borrar este pedido?')) return
    await deleteSale(id)
    toast.success('Pedido eliminado')
    load()
  }

  const startEdit = (sale) => {
    setEditing(sale.id)
    setDraft({
      customer: sale.customer || '',
      address: sale.address || '',
      status: sale.status || 'pendiente',
      notes: sale.notes || '',
    })
  }

  const saveEdit = async (id) => {
    await updateSale(id, draft)
    toast.success('Pedido actualizado')
    setEditing(null)
    load()
  }

  const cancelEdit = () => setEditing(null)

  // helpers
  const statusColor = (s) => {
    switch (s) {
      case 'entregado':
        return 'bg-green-100 text-green-700'
      case 'en camino':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading)
    return (
      <div className="p-4 text-gray-500">Cargando pedidos...</div>
    )

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-accent mb-4">Pedidos</h1>

      {/* Filtros rápidos */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(PERIODS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setPeriod(key)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              period === key
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Listado */}
      <div className="space-y-4">
        {sales.map((s) => (
          <motion.div
            key={s.id}
            layout
            className="bg-white rounded-xl shadow p-4 grid gap-3 md:grid-cols-3"
          >
            {/* Columna 1 – datos cliente */}
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-semibold">
                {s.createdAt?.toDate().toLocaleString('es-AR')}
              </p>
              {editing === s.id ? (
                <input
                  className="mt-2 w-full px-2 py-1 border rounded"
                  value={draft.customer}
                  onChange={(e) =>
                    setDraft({ ...draft, customer: e.target.value })
                  }
                  placeholder="Nombre cliente"
                />
              ) : (
                <>
                  <p className="text-sm text-gray-500 mt-2">Cliente</p>
                  <p>{s.customer || '—'}</p>
                </>
              )}
            </div>

            {/* Columna 2 – productos + total */}
            <div>
              <p className="text-sm text-gray-500">Productos</p>
              <ul className="list-disc list-inside text-sm">
                {s.items?.map((i, idx) => (
                  <li key={idx}>
                    {i.qty} × {i.name}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-primary">Total: ${s.total?.toFixed(2)}</p>
            </div>

            {/* Columna 3 – estado + acciones */}
            <div className="flex flex-col gap-2">
              {editing === s.id ? (
                <>
                  <select
                    className="px-2 py-1 border rounded"
                    value={draft.status}
                    onChange={(e) =>
                      setDraft({ ...draft, status: e.target.value })
                    }
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="preparando">Preparando</option>
                    <option value="en camino">En camino</option>
                    <option value="entregado">Entregado</option>
                  </select>
                  <textarea
                    className="px-2 py-1 border rounded resize-none"
                    rows={2}
                    value={draft.notes}
                    onChange={(e) =>
                      setDraft({ ...draft, notes: e.target.value })
                    }
                    placeholder="Notas internas"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(s.id)}
                      className="flex-1 bg-green-500 text-white py-1 rounded hover:bg-green-600"
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 bg-gray-400 text-white py-1 rounded hover:bg-gray-500"
                    >
                      <FiX />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span
                    className={`self-start px-2 py-1 rounded-full text-xs ${statusColor(
                      s.status
                    )}`}
                  >
                    {s.status || 'pendiente'}
                  </span>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => startEdit(s)}
                      className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
        {sales.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No hay pedidos en este período
          </p>
        )}
      </div>
    </div>
  )
}