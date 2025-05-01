import React, { useContext, useState, useEffect } from 'react'
import { AdminDataContext } from '../context/AdminContext'
import CreateTask from '../components/createTask'
import Header from '../components/Header'
import { authAdmin } from '../services/admin.service'
import Loading from '../components/Loading'

const AdminDashboard = () => {
    const { adminData, setAdminData } = useContext(AdminDataContext)
    const [createTaskPanel, setCreateTaskPanel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setIsLoading(true)
                const response = await authAdmin()
                const data = response.data.data[0]
                setAdminData(data)
                setUsername(data.username)
                setEmployees(data.employees)
            } catch (error) {
                console.error('Error fetching admin data:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAdminData()
    }, [setAdminData])

    if (isLoading || !adminData) {
        return <Loading />
    }

    return (
        <div className='min-h-screen h-screen p-3 w-full text-white bg-black'>
            <div className='relative h-full bg-[#222222] rounded-md p-3'>
                <Header route='/admin-logout' username={username} />
                <button
                    onClick={() => setCreateTaskPanel(true)}
                    className='text-xl bg-gray-200 mt-5 text-black rounded-md px-3 py-1 font-bold'
                >
                    Create task
                </button>
                <div
                    className={`absolute top-0 w-full left-0 h-full transition-all duration-300 
                    ${!createTaskPanel ? '-translate-x-full opacity-0' : 'translate-y-0 opacity-100'}`}
                >
                    <CreateTask
                        createTaskPanel={{ createTaskPanel, setCreateTaskPanel }}
                        employees={{ employees, setEmployees }}
                    />
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
