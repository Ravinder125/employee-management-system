import React, { useState, useContext, useEffect } from 'react'
import Header from '../components/Header'
import TasksStausBar from '../components/TasksStausBar'
import TaskList from '../components/TaskList'
import EmployeeDataContext from '../context/EmployeeContext'
import { authEmployee } from '../services/employee.service'
import Loading from '../components/Loading'

const EmployeeDashboard = () => {
    const [tasksPanelVisible, setTasksPanelVisible] = useState(false)
    const [employeeData, setEmployeeData] = useState({})
    const [isLoading, setILoading] = useState(false)
    // const { employeeData, setEmployeeData } = useContext(EmployeeDataContext)

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                setILoading(true)
                const response = await authEmployee();
                if (response.status === 200) {
                    setEmployeeData(response.data.data[0]);
                }
            } catch (error) {
                console.error('Error fetching employee data:', error);
            } finally {
                setILoading(false)
            }
        }
        fetchEmployeeData();
    }, [setEmployeeData])

    if (isLoading) {
        return <div><Loading /></div>
    } else {
        return (
            <div className='min-h-screen h-screen p-3 w-full text-white bg-black '>
                <div className='relative h-full bg-[#222222] rounded-md p-3'>
                    <Header route='/logout' username={'Ravinder'} />
                    <TasksStausBar />
                    <div className={`w-full overflow-auto lg:overflow-hidden hide-scrollbar transition-all duration-400 ease-in-out rounded-md 
                  ${!tasksPanelVisible ? 'h-1/2 mt-3  left-0 bottom-2' : 'h-full left-0  absolute bottom-0'} lg:h-[75%] `}>
                        <TaskList tasksPanelVisible={{ tasksPanelVisible, setTasksPanelVisible }} tasks={employeeData.todos} />
                    </div>
                </div>
            </div >
        )
    }
}

export default EmployeeDashboard