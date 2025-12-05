'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import { Lock, Mail, AlertCircle } from 'lucide-react'

export default function ClienteLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Buscar solicitud por email
      const { data: solicitudes, error: searchError } = await supabase
        .from('solicitudes')
        .select('*')
        .eq('email', email)
        .limit(1)

      if (searchError) throw searchError

      if (!solicitudes || solicitudes.length === 0) {
        setError('No encontramos ninguna solicitud con este email')
        return
      }

      // Guardar sesión en localStorage
      localStorage.setItem('cliente_email', email)
      localStorage.setItem('cliente_nombre', solicitudes[0].nombre)
      
      // Redirigir al dashboard del cliente
      router.push('/cliente/dashboard')
    } catch (err) {
      console.error('Error en login:', err)
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Portal del Cliente
              </h1>
              <p className="text-gray-600">
                Accede a tu panel para ver el estado de tu proyecto
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ¡Bienvenido! Redirigiendo...
                </p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="tu@email.com"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Usa el mismo email que usaste al solicitar tu web
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Accediendo...
                  </>
                ) : (
                  'Acceder a mi proyecto'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿No tienes un proyecto aún?{' '}
                <a href="/solicitar" className="text-primary-600 hover:text-primary-700 font-medium">
                  Solicita tu web aquí
                </a>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Problemas para acceder?{' '}
              <a href="mailto:soporte@tuweben24h.com" className="text-primary-600 hover:text-primary-700">
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}


