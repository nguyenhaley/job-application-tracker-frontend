import { useState } from 'react'
import {API_URL} from '../api'
import { useNavigate } from 'react-router-dom'

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
        setErrorMessage(errorData.detail || 'Signup failed')
    }
    }

  return (
    <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        {!successMessage && (
            <>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </>
        )}
    </form>
  )
}

export default Signup