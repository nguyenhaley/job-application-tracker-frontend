import { useState, useEffect } from 'react'
import { API_URL } from '../api'
import AddApplicationForm from '../components/AddApplicationForm'

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function fetchApplications() {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/applications`, {
      headers: { 'Authorization': `Bearer ${token}` } // request requires token from localStorage since user needs to be authenticated
    })
    const data = await response.json()
    setApplications(data)
  }

  // will handle status changed to applications
  async function handleStatusChange(applicationId, newStatus) {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/applications/${applicationId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status: newStatus })
  })

  if (response.ok) {
    fetchApplications() // refresh the list of applications after status change
  }
}

  useEffect(() => {
    fetchApplications()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => setIsModalOpen(true)}>Add Application</button>
      {applications.map((app) => (
        <div key={app.id}>
          <p>{app.date_applied} - {app.company.name} - {app.source} - {app.role_title}
            <select value={app.current_status} onChange={(e) => handleStatusChange(app.id, e.target.value)}>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </p>
        </div>
      ))}
      {isModalOpen && (
        <AddApplicationForm
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false)
            fetchApplications()
          }}
        />
      )}
    </div>
  )
}

export default Dashboard