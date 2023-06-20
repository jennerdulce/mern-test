import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goal)

  useEffect(() => {
    if(isError) {
      console.log('ERROR: ', message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch, navigate])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section>
        <h1>Welcome {user && user.name}</h1> {/* if user, then display username */}
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section>
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals yet</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard