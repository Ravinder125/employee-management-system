import axios from 'axios';




const Url = `${import.meta.env.VITE_BASE_URL}/todos`;

const createTask = async (data) => {
    const response = await axios.post(`${Url}/create`, data, {
        withCredentials: true,
    })
    return response
}

// const  = async () => {
//     const response = await axios.get(`${Url}/todos`, {
//         withCredentials: true,
//     })
// }



export {
    createTask,
}