import { useEffect, useState } from 'react'
import { fetchSales } from '../../services/sales'

export default function Sales() {
  const [sales, setSales] = useState([])

  useEffect(() => {
    fetchSales().then((data) =>
      setSales(
        data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds),
      ),
    )
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">Historial de Ventas</h1>

      <div className="space-y-4">
        {sales.map((s) => (
          <div key={s.id} className="bg-white rounded-xl shadow p-4">
            <p className="text-sm text-gray-500">
              {s.createdAt?.toDate().toLocaleString('es-AR')}
            </p>
            <ul className="mt-2 list-disc list-inside text-sm">
              {s.items.map((i) => (
                <li key={i.id}>
                  {i.qty}x {i.name} — ${(i.qty * i.price).toFixed(2)}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ${s.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}