import axios from 'axios'


const Url = `${import.meta.env.VITE_BASE_URL}/admins`

const registerAdmin = async (data) => {
    const response = await axios.post(`${Url}/register`, data, {
        // withCredentials: true,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
    return response
}
const loginAdmin = async (data) => {
    const response = await axios.post(`${Url}/login`, data, {
        withCredentials: true,
    })
    return response
}


const logoutAdmin = async () => {
    const response = await axios.get(`${Url}/logout`, {
        withCredentials: true
    })
    return response
}

const authAdmin = async () => {
    const response = await axios.get(`${Url}/profile`, {
        withCredentials: true
    })
    return response;
}


export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    authAdmin
}