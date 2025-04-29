import React from 'react'

const TasksStausBar = () => {
    return (
        <div className='mt-8 flex flex-wrap justify-center lg:gap-10 gap-1'>
            <div className='bg-blue-400 justify w-40 md:w-60 h-25 md:h-30 rounded-md px-3'>
                <div className='text-3xl md:text-5xl font-extrabold'>0</div>
                <h4 className='font-medium'>New Task</h4>
            </div>
            <div className='bg-green-400 justify w-40 md:w-60 h-25 md:h-30 rounded-md px-3'>
                <div className='text-3xl md:text-5xl font-extrabold'>3</div>
                <h4 className='font-medium'>Completed</h4>
            </div>
            <div className='bg-yellow-400 justify w-40 md:w-60 h-25 md:h-30 rounded-md px-3 text-black'>
                <div className='text-3xl md:text-5xl font-extrabold'>0</div>
                <h4 className='font-medium'>Accepted</h4>
            </div>
            <div className='bg-red-400 justify w-40 md:w-60 h-25 md:h-30 rounded-md px-3'>
                <div className='text-3xl md:text-5xl font-extrabold'>1</div>
                <h4 className='font-medium'>Failed</h4>
            </div>
        </div>
    )
}

export default TasksStausBar