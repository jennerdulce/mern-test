import axios from 'axios'
const API_URL = 'api/goals/'

// display my goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.get(API_URL, config)

    if (response.data) {
        return response.data
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

const deleteGoal = async (goalID, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    const response = await axios.delete(API_URL + goalID, config)

    if (response.data) {
        return response.data
    }
}

const goalService = {
    getGoals,
    createGoal,
    deleteGoal
}

export default goalService