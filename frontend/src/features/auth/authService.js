import axios from 'axios'
const API_URL = 'api/users/'

// register user
// makes request to endpoint api/users/ and sends following data, userData
const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData)

    // when making an axios request, returns an object with a property of 'data'
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// logout user
const logout = () => {
    localStorage.removeItem('user')
}

// login
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    registerUser,
    logout,
    login
}

export default authService