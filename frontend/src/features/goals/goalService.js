import axios from 'axios'
const API_URL = 'api/goals/'

// display my goals
const getGoals = async (userData) => {
    const response = await axios.get(API_URL, userData)

    if (response.data) {
        return response
    }
}

const createGoal = async (goalData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.post(API_URL, goalData, config)

    if (response.data) {
        return response.data
    }
}

const goalService = {
    getGoals,
    createGoal
}

export default goalService