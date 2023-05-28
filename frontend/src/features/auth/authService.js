import axios from 'axios'
const API_URL = 'api/users/'

// register user
// makes request to endpoint api/users/ and sends following data, userData
const registerUser = async (userData) => {
    const registeredUser = await axios.post(API_URL, userData)

    // when making an axios request, returns an object with a property of 'data'
    if(registeredUser.data) {
        localStorage.setItem('user', JSON.stringify(registeredUser.data))
    }
}

const authService = {
    registerUser
}

export default authService