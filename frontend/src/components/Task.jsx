import React from 'react'

const Task = ({ title, id, task, priority, dueDate }) => {
    return (
        <div className={`absolute top-${(id * 2) + 'px'} z-${id} bg-red-400 w-80 min-h-40 h-40  max-h-50  mt-2 rounded-md p-3`} >
            <div className='flex justify-between'>
                <h4 className='bg-red-500 w-fit p-1 rounded-md text-xs mb-3'>{title}</h4>
                <div className='text-xs'>{dueDate}</div>
            </div>
            <h2 className='text-lg'>{title}</h2>
            <p className='text-sm'>{task}</p>
        </div >
    )
}

export default Task