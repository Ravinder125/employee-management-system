import React, { useState } from 'react'
import Task from './Task'
import SocialIcon from './SocialIcon'


const TaskList = (props) => {
    const { tasksPanelVisible, setTasksPanelVisible } = props.tasksPanelVisible
    const tasks = [
        {
            "id": 1,
            "title": "Sales Reporting",
            "task": "Prepare weekly sales report",
            "priority": "High",
            "dueDate": "2025-05-03"
        },
        {
            "id": 2,
            "title": "Customer Support",
            "task": "Respond to customer support emails",
            "priority": "Medium",
            "dueDate": "2025-04-30"
        },
        {
            "id": 3,
            "title": "Documentation Update",
            "task": "Update project documentation",
            "priority": "Low",
            "dueDate": "2025-05-05"
        },
        {
            "id": 4,
            "title": "Client Meeting",
            "task": "Attend client meeting via Zoom",
            "priority": "High",
            "dueDate": "2025-04-29"
        },
        {
            "id": 5,
            "title": "Feature Testing",
            "task": "Test new feature on staging environment",
            "priority": "Medium",
            "dueDate": "2025-05-01"
        },
        {
            "id": 6,
            "title": "Code Review",
            "task": "Review team pull requests",
            "priority": "Medium",
            "dueDate": "2025-04-30"
        },
        {
            "id": 7,
            "title": "File Organization",
            "task": "Organize digital files and folders",
            "priority": "Low",
            "dueDate": "2025-05-06"
        },
        {
            "id": 8,
            "title": "Presentation Preparation",
            "task": "Create slides for monthly presentation",
            "priority": "High",
            "dueDate": "2025-05-02"
        },
        {
            "id": 9,
            "title": "Intern Onboarding",
            "task": "Conduct onboarding session for new intern",
            "priority": "Medium",
            "dueDate": "2025-05-04"
        },
        {
            "id": 10,
            "title": "User Feedback Analysis",
            "task": "Analyze user feedback and summarize findings",
            "priority": "High",
            "dueDate": "2025-05-03"
        },
        {
            "id": 6,
            "title": "Code Review",
            "task": "Review team pull requests",
            "priority": "Medium",
            "dueDate": "2025-04-30"
        },
        {
            "id": 7,
            "title": "File Organization",
            "task": "Organize digital files and folders",
            "priority": "Low",
            "dueDate": "2025-05-06"
        },
        {
            "id": 8,
            "title": "Presentation Preparation",
            "task": "Create slides for monthly presentation",
            "priority": "High",
            "dueDate": "2025-05-02"
        },
        {
            "id": 9,
            "title": "Intern Onboarding",
            "task": "Conduct onboarding session for new intern",
            "priority": "Medium",
            "dueDate": "2025-05-04"
        },
        {
            "id": 10,
            "title": "User Feedback Analysis",
            "task": "Analyze user feedback and summarize findings",
            "priority": "High",
            "dueDate": "2025-05-03"
        },
        {
            "id": 6,
            "title": "Code Review",
            "task": "Review team pull requests",
            "priority": "Medium",
            "dueDate": "2025-04-30"
        },
        {
            "id": 7,
            "title": "File Organization",
            "task": "Organize digital files and folders",
            "priority": "Low",
            "dueDate": "2025-05-06"
        },
        {
            "id": 8,
            "title": "Presentation Preparation",
            "task": "Create slides for monthly presentation",
            "priority": "High",
            "dueDate": "2025-05-02"
        },
        {
            "id": 9,
            "title": "Intern Onboarding",
            "task": "Conduct onboarding session for new intern",
            "priority": "Medium",
            "dueDate": "2025-05-04"
        },
        {
            "id": 10,
            "title": "User Feedback Analysis",
            "task": "Analyze user feedback and summarize findings",
            "priority": "High",
            "dueDate": "2025-05-03"
        }
    ]




    return (
        <div className={`h-full overflow-y-auto hide-scrollbar bg-[#333333] p-2 md:p-5 lg:rounded-md w-full transition-all duration-500 ease-in-out`}>
            <div
                className={`flex h-8 justify-center  bg-transparent  xl:hidden`}
                onClick={() => setTasksPanelVisible(!tasksPanelVisible)}
            >
                <SocialIcon icon={`ri-arrow-${tasksPanelVisible ? 'down' : 'up'}-wide-fill`} textColor='white' />
            </div>
            <div className={`flex justify-center gap-5 md:justify-start flex-wrap md:h-full h-[94%]  w-full overflow-y-auto hide-scrollbar`}>
                {tasks.map((value, idx) => (
                    <Task key={idx} title={value.title} task={value.task} priority={value.priority} dueDate={value.dueDate} />
                ))}
            </div>
        </div >
    )
}

export default TaskList