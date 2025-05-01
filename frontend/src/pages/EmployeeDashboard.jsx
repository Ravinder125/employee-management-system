import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import TasksStausBar from '../components/TasksStausBar'
import TaskList from '../components/TaskList'
import EmployeeDataContext from '../context/EmployeeContext'

const EmployeeDashboard = () => {
    const [tasksPanelVisible, setTasksPanelVisible] = useState(false)
    // const { employeeData, setEmployeeData } = useContext(EmployeeDataContext)


    return (
        <div className='min-h-screen h-screen p-3 w-full text-white bg-black '>
            <div className='relative h-full bg-[#222222] rounded-md p-3'>
                <Header route='/logout' username={'Ravinder'} />
                <TasksStausBar />
                <div className={`w-full overflow-auto lg:overflow-hidden hide-scrollbar transition-all duration-400 ease-in-out rounded-md 
                  ${!tasksPanelVisible ? 'h-1/2 mt-3  left-0 bottom-2' : 'h-full left-0  absolute bottom-0'} lg:h-[75%] `}>
                    <TaskList tasksPanelVisible={{ tasksPanelVisible, setTasksPanelVisible }} />
                </div>
            </div>
        </div >
    )
}

export default EmployeeDashboard