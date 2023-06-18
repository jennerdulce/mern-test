import React from 'react'
// import { useDispatch } from 'react-red'
// import {deleteGoal} from '../features/goals/goalSlice'

function GoalItem({ goal }) {
    // const dispatch = useDispatch()

    return (
        <>
            <div>
                <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
                <h2>{goal.text}</h2>
                {/* <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
                    X
                </button> */}
            </div>
        </>
    )
}

export default GoalItem