import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Products from './pages/admin/Products'
import Sales from './pages/admin/Sales'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="cart" element={<Cart />} />
                </Routes>
              </>
            }
          />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}