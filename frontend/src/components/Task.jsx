import React, { useState } from 'react'
import SocialIcon from './SocialIcon';
import { updateTaskStatus } from '../services/task.service';

const Task = ({ id, title, task, priority, dueDate }) => {
    const [success, setSuccess] = useState(false);
    const pickCardBgColor = (variant, priority) => {
        // Function to pick background color based on priority
        // and whether it's a card or not
        const bgColor = {
            'priority': {
                'high': 'bg-red-500',
                'medium': 'bg-yellow-500',
                'low': 'bg-green-500'
            },
            'card': {
                'high': 'bg-red-400',
                'medium': 'bg-yellow-400',
                'low': 'bg-green-400'
            }
        }
        return bgColor[variant][priority.toLowerCase()];
    }

    const handleClick = async (boolean) => {
        try {
            const data = {
                status: boolean ? 'completed' : 'failed'
            }
            const response = await updateTaskStatus(id, data);
            if (response.status === 200) {
                console.log('Task updated successfully:', response.data.data);
                setSuccess(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (success) {
        return;
    } else {
        return (
            <div className={`w-80 relative h-65 lg:h-100 ${pickCardBgColor('card', priority)} rounded-md p-3`}>
                <div className='h-full'>
                    <div className='flex justify-between'>
                        <div className='h-[10%] w-full flex items-center justify-between'>
                            <h4 className={`p-1 rounded-md text-xs
                             ${pickCardBgColor('priority', priority)}`}>{priority}</h4>
                            <div className='text-xs'>{dueDate.split('T')[0]}</div>
                        </div>
                    </div>
                    <div className='h-[70%] lg:h-[80%] hide-scrollbar overflow-auto '>
                        <h2 className='text-xl font-bold'>{title}</h2>
                        <p className='text-sm mt-1  h-[80%] lg:h-full'>{task}</p>
                    </div>
                </div>
                <div className='flex absolute left-0 bottom-0 p-2 w-full justify-between items-center mt-3'>
                    <button onClick={() => handleClick(false)} className={`flex font-medium text-lg gap-2 items-center justify-center bg-red-500 rounded-md px-3 py-1  `}>
                        <span>Failed</span>
                        <SocialIcon icon='ri-close-line' />
                    </button>
                    <button onClick={() => handleClick(true)} className={`flex font-medium text-lg gap-2 items-center justify-center bg-green-500 rounded-md px-3 py-1  `}>
                        <span>Confirm</span>
                        <SocialIcon icon='ri-check-line' />
                    </button>
                </div>
            </div >
        )
    }
}

export default Task