import React from 'react'
import SocialIcon from './SocialIcon';

const Task = ({ title, task, priority, dueDate }) => {
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
    return (
        <div className={`w-80 relative overflow-auto hidden-scrollbar h-100 ${pickCardBgColor('card', priority)} rounded-md p-3`}>
            <div>
                <div className='flex justify-between'>
                    <h4 className={`w-fit p-1 rounded-md text-xs mb-3 ${pickCardBgColor('priority', priority)}`}>{priority}</h4>
                    <div className='text-xs'>{dueDate}</div>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
                <p className='text-sm mt-1'>{task}</p>
            </div>
            <div className='flex absolute left-0 bottom-0 p-2 w-full justify-between items-center mt-3'>
                <button className={`flex font-medium text-lg gap-2 items-center justify-center bg-red-500 rounded-md px-3 py-1  `}>
                    <span>Failed</span>
                    <SocialIcon icon='ri-close-line' />
                </button>
                <button className={`flex font-medium text-lg gap-2 items-center justify-center bg-green-500 rounded-md px-3 py-1  `}>
                    <span>Confrim</span>
                    <SocialIcon icon='ri-check-line' />
                </button>
            </div>
        </div >
    )
}

export default Task