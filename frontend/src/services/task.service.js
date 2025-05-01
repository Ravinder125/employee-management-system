import axios from 'axios';




const Url = `${import.meta.env.VITE_BASE_URL}/todos`;

const createTask = async (data) => {
    const response = await axios.post(`${Url}/`, data)
    return response
}



export {
    createTask,
}