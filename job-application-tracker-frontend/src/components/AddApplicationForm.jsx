import { useState } from 'react'
import {API_URL} from '../api'

function AddApplicationForm({ onClose, onSuccess }) {
  const [dateApplied, setDateApplied] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [roleTitle, setRoleTitle] = useState('')
  const [location, setLocation] = useState('')
  const [applicationLink, setApplicationLink] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            date_applied: dateApplied,
            company_name: companyName,
            role_title: roleTitle,
            location: location,
            application_link: applicationLink
        })
    })

    if (response.ok) {
        const data = await response.json()
        setSuccessMessage('Application added successfully!')
        setTimeout(() => {
            onSuccess()
        }, 2000)
    } else {
        const errorData = await response.json()
        setErrorMessage(errorData.detail || 'Failed to add application')
    }
}

  return (
    <form onSubmit={handleSubmit}>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        {!successMessage && (
            <>
                <input type="date" value={dateApplied} onChange={(e) => setDateApplied(e.target.value)} className="border" />
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border"/>
                <input type="text" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className="border"/>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="border"/>
                <input type="text" value={applicationLink} onChange={(e) => setApplicationLink(e.target.value)} className="border"/>
                <br></br>
                <button type="button" onClick={onClose}>Cancel</button> 
                <br></br>
                <button type="submit">Submit</button>
            </>
        )}
    </form>
  )
}

export default AddApplicationForm