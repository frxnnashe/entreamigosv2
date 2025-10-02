import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, pass)
      nav('/admin')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-accent mb-4">Admin Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handle} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Contraseña"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button className="w-full bg-accent text-white py-2 rounded-lg">
          Entrar
        </button>
      </form>
    </div>
  )
}