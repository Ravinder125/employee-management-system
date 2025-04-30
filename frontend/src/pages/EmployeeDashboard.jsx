import React from 'react'
import Header from '../components/Header'
import TasksStausBar from '../components/TasksStausBar'
import TaskList from '../components/TaskList'

const EmployeeDashboard = () => {
    return (
        <div className='min-h-screen h-screen p-3  w-full text-white bg-black '>
            <div className='relative h-full bg-[#222222] rounded-md p-3'>
                <Header />
                <TasksStausBar />
                <TaskList />
            </div>
        </div>
    )
}

export default EmployeeDashboard