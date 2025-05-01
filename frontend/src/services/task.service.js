import axios from 'axios';




const Url = `${import.meta.env.VITE_BASE_URL}/todos`;

const createTask = async (data) => {
    const response = await axios.post(`${Url}/create`, data, {
        withCredentials: true,
    })
    return response
}

const updateTaskStatus = async (taskId, status) => {
    const response = await axios.patch(`${Url}/${taskId}`, status, {
        withCredentials: true,
    })
    return response
}



export {
    createTask,
    updateTaskStatus,
}