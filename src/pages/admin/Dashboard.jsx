import { useEffect, useState } from 'react'
import { db } from '../../config/firebase'
import { collection, getCountFromServer } from 'firebase/firestore'

export default function Dashboard() {
  const [prod, setProd] = useState(0)
  const [sales, setSales] = useState(0)

  useEffect(() => {
    Promise.all([
      getCountFromServer(collection(db, 'products')),
      getCountFromServer(collection(db, 'sales')),
    ]).then(([p, s]) => {
      setProd(p.data().count)
      setSales(s.data().count)
    })
  }, [])

  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-accent mb-4">Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-xl shadow p-6 card-hover">
          <p className="text-sm text-gray-500">Productos</p>
          <p className="text-3xl font-bold text-primary">{prod}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 card-hover">
          <p className="text-sm text-gray-500">Ventas registradas</p>
          <p className="text-3xl font-bold text-primary">{sales}</p>
        </div>
      </div>
    </div>
  )
}