import React, { useContext, useState, useEffect } from 'react'
import { AdminDataContext } from '../context/AdminContext'
import CreateTask from '../components/createTask'
import Header from '../components/Header'
import { authAdmin } from '../services/admin.service'
import Loading from '../components/Loading'


const AdminDashboard = () => {
    const [adminData, setAdminData] = useState(null)
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
            <div className='relative h-full overflow-auto bg-[#222222] rounded-sm p-3'>
                <Header route='/admin-logout' username={adminData.username} />
                <button
                    onClick={() => setCreateTaskPanel(true)}
                    className='text-xl bg-gray-200 mt-5 text-black rounded-md px-3 py-1 font-bold hover:bg-gray-300 transition-all duration-300 ease-in-out md:hidden'
                >
                    Create task
                </button>
                <div
                    className={`absolute top-0 w-[351px] left-0 2xl:h-[90%] 2xl:flex 2xl:justify-center 2xl:items-center h-full transition-all duration-300 md:static md:translate-x-0 md:opacity-100 2xl:w-1/2
                    ${!createTaskPanel ? '-translate-x-full opacity-0' : 'translate-y-0 opacity-100'}`}
                >
                    <CreateTask
                        createTaskPanel={{ createTaskPanel, setCreateTaskPanel }}
                        employees={{ employees, setEmployees }}
                    />
                </div>
                <div className='h-full mt-5 gap-2 flex flex-col '>
                    {employees.map((employee, idx) => (
                        <div key={idx} className='flex flex-col gap-1 p-3'>
                            <div className='flex items-center gap-2'>
                                <img src={employee.avatar} alt="avatar" className='w-10 h-10 object-cover rounded-full' />
                                <h1 className='text-xl font-bold'>{employee.username}</h1>
                            </div>
                            <div className='flex flex-col overflow-auto gap-4  p-3 mt-2 w-[300px] h-[300px] rounded-sm bg-[#111111]'>
                                {employee.todos.map((todo, idx) => (
                                    <div key={idx} className='w-full min-h-[275px] h-[275px] p-2 bg-[#222222] rounded-sm overflow-auto'>
                                        <div className='flex items-center text-xs justify-between '>
                                            <h4>{todo.priority}</h4>
                                            <h4>{todo.dueTo?.split('T')[0]}</h4>
                                        </div>
                                        <div>
                                            <h1 className='text-lg font-bold'>{todo.title}</h1>
                                            <p className='text-sm'>{todo.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
