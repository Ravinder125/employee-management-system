import React, { useContext, useState } from 'react'
import { AdminDataContext } from '../context/AdminContext'
import CreateTask from '../components/createTask'
import Header from '../components/Header'

const AdminDashboard = () => {
    const { adminData, setAdminData } = useContext(AdminDataContext)
    const [creatTask, setCreateTask] = useState(true)
    return (
        <div className='min-h-screen h-screen p-3 w-full text-white bg-black'>
            <div className='relative h-full bg-[#222222] rounded-md p-3'>
                <Header route='/admin-logout' username={adminData.username} />
                <button onClick={() => setCreateTask(true)} className='text-xl bg-gray-200 mt-5 text-black rounded-md px-3 py-1 font-bold'>Create task</button>
                <CreateTask />
            </div>
        </div>
    )
}

export default AdminDashboard