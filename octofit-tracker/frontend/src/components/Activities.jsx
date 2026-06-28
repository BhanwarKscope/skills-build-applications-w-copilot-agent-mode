import { useEffect, useState } from 'react'
import { fetchApiItems } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiItems('activities')
      .then((items) => {
        if (isMounted) {
          setActivities(items)
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
    return <p className="status-message">Loading activities...</p>
  }

  if (status === 'error') {
    return <p className="status-message error">Unable to load activities: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Activity logging</p>
        <h2>Recent workouts</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Member</th>
              <th>Type</th>
              <th>Minutes</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
                <td>{activity.username}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : 'TBD'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities