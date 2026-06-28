import { useEffect, useState } from 'react'
import { fetchApiItems } from '../api.js'

const WORKOUTS_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiItems(WORKOUTS_ENDPOINT)
      .then((items) => {
        if (isMounted) {
          setWorkouts(items)
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
    return <p className="status-message">Loading workouts...</p>
  }

  if (status === 'error') {
    return <p className="status-message error">Unable to load workouts: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h2>Workout library</h2>
      </div>
      <div className="card-grid">
        {workouts.map((workout) => (
          <article className="data-card" key={workout._id ?? workout.title}>
            <h3>{workout.title}</h3>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Difficulty</dt>
                <dd className="text-capitalize">{workout.difficulty}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
              <div>
                <dt>Best for</dt>
                <dd>{workout.recommendedForGoal}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Workouts