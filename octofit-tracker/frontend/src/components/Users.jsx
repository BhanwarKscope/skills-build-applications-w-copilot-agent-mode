import { useEffect, useState } from 'react'
import { fetchApiItems } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiItems('users')
      .then((items) => {
        if (isMounted) {
          setUsers(items)
          setStatus('ready')
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (status === 'loading') {
    return <p className="status-message">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-message error">Unable to load users: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h2>Members</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Team</th>
              <th>Level</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id ?? user.username}>
                <td>{user.displayName}</td>
                <td>{user.username}</td>
                <td>{user.team}</td>
                <td className="text-capitalize">{user.level}</td>
                <td>{user.fitnessGoal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users