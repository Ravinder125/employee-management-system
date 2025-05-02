import React, { useState } from 'react'
import Task from './Task'
import SocialIcon from './SocialIcon'


const TaskList = (props) => {
    const { tasksPanelVisible, setTasksPanelVisible } = props.tasksPanelVisible
    console.log(props.tasks)


    return (
        <div className={`h-full overflow-y-auto hide-scrollbar bg-[#333333] p-2 md:p-5 lg:rounded-md w-full transition-all duration-500 ease-in-out`}>
            <div
                className={`flex h-8 justify-center  bg-transparent  xl:hidden`}
                onClick={() => setTasksPanelVisible(!tasksPanelVisible)}
            >
                <SocialIcon icon={`ri-arrow-${tasksPanelVisible ? 'down' : 'up'}-wide-fill`} textColor='white' />
            </div>
            <div className={`flex justify-center lg:gap-5 gap-2 md:justify-start flex-wrap md:h-full h-[94%]  w-full overflow-y-auto`}>
                {props.tasks?.map((task, idx) => (
                    <Task key={idx} id={task._id} title={task.title} task={task.description} priority={task.priority} dueDate={task.dueTo} />
                ))}
            </div>
        </div >
    )
}

export default TaskList