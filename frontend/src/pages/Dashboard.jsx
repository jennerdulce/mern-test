import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import GoalItem from '../components/GoalItem'
import GoalForm from '../components/GoalForm'

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  // const { goals } = useSelector((state) => state.goal)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1> {/* if user, then display username */}
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section>
        {/* {goals.length > 0 ? (
          <div>
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals yet</h3>
        )} */}
      </section>
    </>
  )
}

export default Dashboard