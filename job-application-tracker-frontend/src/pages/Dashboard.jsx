import { useState, useEffect } from 'react'
import { API_URL } from '../api'
import AddApplicationForm from '../components/AddApplicationForm'

function Dashboard() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    async function fetchApplications() {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/applications`, {
        headers: { 'Authorization': `Bearer ${token}` } /* request requires token from localStorage since user needs to be authenticated */
      })
      const data = await response.json()
      setApplications(data)
    }

    fetchApplications()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <AddApplicationForm />
      {applications.map((app) => (
        <div key={app.id}>
          <p> {app.date_applied} - {app.source} - {app.company.name} - {app.role_title} - {app.current_status}</p>
        </div>
      ))}
    </div>
  )
}

export default Dashboard