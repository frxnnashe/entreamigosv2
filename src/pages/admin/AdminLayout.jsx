import { Outlet, Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, db } from '../../config/firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { toast, Toaster } from 'react-hot-toast'   // librería liviana de toasts

export default function AdminLayout() {
  const nav = useNavigate()

  const logout = async () => {
    await signOut(auth)
    nav('/login')
  }

  const resetSales = async () => {
    if (!confirm('¿Borrar TODAS las ventas? No hay vuelta atrás.')) return
    const snap = await getDocs(collection(db, 'sales'))
    await Promise.all(snap.docs.map((d) => deleteDoc(doc(db, 'sales', d.id))))
    toast.success('Ventas eliminadas')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <Toaster position="top-right" />
      <aside className="fixed w-64 bg-white h-full shadow p-6 space-y-4">
        <h2 className="text-xl font-bold text-accent">Panel Admin</h2>

        <nav className="space-y-2 text-sm">
          <Link to="/admin" className="block hover:text-primary">Dashboard</Link>
          <Link to="/admin/products" className="block hover:text-primary">Productos</Link>
          <Link to="/admin/sales" className="block hover:text-primary">Ventas</Link>
        </nav>

        <div className="mt-auto space-y-3">
          <button
            onClick={resetSales}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
          >
            Reset Ventas
          </button>

          <Link
            to="/"
            className="w-full block text-center bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
          >
            Volver al menú
          </Link>

          <button
            onClick={logout}
            className="w-full text-sm underline text-gray-600"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}