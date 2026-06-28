import { useEffect, useState } from 'react'
import { fetchApiItems } from '../api.js'

const LEADERBOARD_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiItems(LEADERBOARD_ENDPOINT)
      .then((items) => {
        if (isMounted) {
          setLeaders(items)
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
    return <p className="status-message">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-message error">Unable to load leaderboard: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h2>Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        {leaders.map((leader) => (
          <article className="leader-card" key={leader._id ?? leader.username}>
            <span className="rank">#{leader.rank}</span>
            <div>
              <h3>{leader.username}</h3>
              <p>{leader.team}</p>
            </div>
            <div className="score-block">
              <strong>{leader.points}</strong>
              <span>{leader.streakDays} day streak</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard