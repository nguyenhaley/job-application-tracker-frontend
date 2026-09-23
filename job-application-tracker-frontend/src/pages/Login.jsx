import { useState } from 'react'
import {API_URL} from '../api'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    })

    if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.access_token)
        // Redirect to dashboard or show success message
        navigate('/dashboard')
    } else {
        // Handle error, show error message
        const errorData = await response.json()
        if (Array.isArray(errorData.detail)) {
          setErrorMessage(errorData.detail[0].msg.toUpperCase())
        } else {
          setErrorMessage(errorData.detail || 'Login failed')
        }
    }
  }

  async function handleDemoLogin() {
    setErrorMessage('')

    const response = await fetch(`${API_URL}/demo-login`, {
        method: 'POST',
    })

    if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.access_token)
        // Redirect to dashboard or show success message
        navigate('/dashboard')
    } else {
        // Handle error, show error message
        const errorData = await response.json()
        if (Array.isArray(errorData.detail)) {
          setErrorMessage(errorData.detail[0].msg.toUpperCase())
        } else {
          setErrorMessage(errorData.detail || 'Login failed')
        }
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* left side of page */}
      <div className="w-1/2 flex items-center justify-center bg-white">

        <button
            type="button"
            onClick={handleDemoLogin}
            className="absolute top-6 left-6 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100 hover:border-indigo-300"
          >
            Try the demo — no signup needed →
        </button>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Login</h1>

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

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
              Log In
            </button>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <Link
              to="/signup"
              className="block text-center border border-gray-300 rounded-md py-2 text-gray-700 hover:bg-gray-50 transition"
            >
              Create Account
            </Link>
          </form>
        </div>

      {/* right side: background */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600" /> 

    </div> 
  ) 
}
export default Login