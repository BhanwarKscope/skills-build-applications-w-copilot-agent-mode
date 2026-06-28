import { useEffect, useState } from 'react'
import { fetchApiItems } from '../api.js'

const TEAMS_ENDPOINT = '/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchApiItems(TEAMS_ENDPOINT)
      .then((items) => {
        if (isMounted) {
          setTeams(items)
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
    return <p className="status-message">Loading teams...</p>
  }

  if (status === 'error') {
    return <p className="status-message error">Unable to load teams: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Team management</p>
        <h2>Training squads</h2>
      </div>
      <div className="card-grid">
        {teams.map((team) => (
          <article className="data-card" key={team._id ?? team.name}>
            <h3>{team.name}</h3>
            <p>{team.motto}</p>
            <dl>
              <div>
                <dt>Members</dt>
                <dd>{team.memberCount}</dd>
              </div>
              <div>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Teams