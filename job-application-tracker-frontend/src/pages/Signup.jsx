import { useState } from 'react'
import {API_URL} from '../api'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    })

    if (response.ok) {
        const data = await response.json()
        setSuccessMessage('Account created! Redirecting to login page...')
        setTimeout(() => {
            navigate('/')
        }, 2000)
    } else {
        // Handle error, show error message
        const errorData = await response.json()
        if (Array.isArray(errorData.detail)) {
          setErrorMessage(errorData.detail[0].msg.toUpperCase())
        } else {
          setErrorMessage(errorData.detail || 'Signup failed')
        }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 absolute inset-0 opacity-100" />

        <div className="relative bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
            <Link
                to="/"
                className="absolute top-4 left-4 text-sm text-gray-500 hover:text-gray-700"
            >
                ← Cancel
            </Link>

            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>

                {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

                {!successMessage && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </form>
        </div>
    </div>
  )
}

export default Signup