import React, { useContext, useState } from 'react'
import { AdminDataContext } from '../context/AdminContext'
import CreateTask from '../components/createTask'
import Header from '../components/Header'

const AdminDashboard = () => {
    const { adminData, setAdminData } = useContext(AdminDataContext)
    const [creatTask, setCreateTask] = useState(false)
    return (
        <div className='min-h-screen h-screen p-3 w-full text-white bg-black'>
            <div className='relative h-full bg-[#222222] rounded-md p-3'>
                <Header route='/admin-logout' username={adminData.username} />
                <button onClick={() => setCreateTask(true)} className='text-xl bg-gray-200 mt-5 text-black rounded-md px-3 py-1 font-bold'>Create task</button>
                <div className={`absolute top-0 w-full left-0 h-full transition-all duration-300 
                    ${!creatTask ? '-translate-x-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                    <CreateTask createTask={{ creatTask, setCreateTask }} />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard