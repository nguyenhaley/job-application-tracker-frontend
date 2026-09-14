import { useState } from 'react'
import {API_URL} from '../api'
import { useNavigate } from 'react-router-dom'

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
        setErrorMessage(errorData.detail || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In</button>
    </form>
  )
}

export default Login