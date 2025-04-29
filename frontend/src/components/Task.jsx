import React from 'react'

const Task = ({ title, id, task, priority, dueDate }) => {
    const pickCardBgColor = (priority, Card) => {
        switch (priority) {
            case 'High':
                if (Card === 'Card') {
                    return 'bg-red-400';
                } else {
                    return 'bg-red-500';
                }
            case 'Medium':
                if (Card === 'Card') {
                    return 'bg-yellow-400';
                } else {
                    return 'bg-yellow-500';
                }
            case 'Low':
                if (Card === 'Card') {
                    return 'bg-green-400';
                } else {
                    return 'bg-green-500';
                } default:
                break;
        }
    }
    return (
        <div key={id} className={`w-80 overflow-auto hidden-scrollbar min-h-40 h-40 ${pickCardBgColor(priority, 'Card')} max-h-50   rounded-md p-3`}>
            <div className='flex justify-between'>
                <h4 className={`w-fit p-1 rounded-md text-xs mb-3 ${pickCardBgColor(priority,)}`}>{priority}</h4>
                <div className='text-xs'>{dueDate}</div>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p className='text-sm mt-1'>{task}</p>
        </div >
    )
}

export default Task