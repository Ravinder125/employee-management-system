import axios from 'axios'


const Url = 'http://localhost:4000/api/v1/users'

const registerEmployee = async (data) => {
    const response = await axios.post(`${Url}/register`, data, {
        // withCredentials: true,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    return response
}
const loginEmployee = async (data) => {
    const response = await axios.post(`${Url}/login`, data, {
        withCredentials: true,
    })
    return response
}



export {
    registerEmployee,
    loginEmployee
}