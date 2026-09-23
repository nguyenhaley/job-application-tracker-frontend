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

  const statusStyles = {
    wishlist: 'bg-pink-100 text-pink-700',
    applied: 'bg-blue-100 text-blue-700',
    interview: 'bg-yellow-100 text-yellow-700',
    offer: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            + Add Application
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm text-gray-500">
              <th className="py-3 px-4 font-medium">Date Applied / Found</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">Role</th>
              <th className="py-3 px-4 font-medium">Location</th>
              <th className="py-3 px-4 font-medium">Link</th>
              <th className="py-3 px-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-500 text-sm">{app.date_applied}</td>
                <td className="py-3 px-4 font-medium text-gray-900">{app.company.name}</td>
                <td className="py-3 px-4 text-gray-700">{app.role_title}</td>
                <td className="py-3 px-4 text-gray-700">{app.location}</td>
                <td className="py-3 px-4">
                  {app.application_link ? (
                    <a
                      href={app.application_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      🔗
                    </a>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={app.current_status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    className={`text-xs font-medium rounded-full px-2 py-1 border-0 ${statusStyles[app.current_status] || 'bg-gray-100 text-gray-700'}`}
                  >
                    <option value="wishlist">Wishlist</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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