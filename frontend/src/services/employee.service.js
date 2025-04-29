import axios from 'axios'
import { data } from 'react-router-dom'


const Url = `${import.meta.env.VITE_BASE_URL}/users`

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

const logoutEmployee = async () => {
    const response = await axios.get(`${Url}/logout`, {
        withCredentials: true
    })
    return response
}

const authEmployee = async () => {
    const response = await axios.get(`${Url}/profile`, {
        withCredentials: true
    })
    return response;
}


export {
    registerEmployee,
    loginEmployee,
    logoutEmployee,
    authEmployee
}