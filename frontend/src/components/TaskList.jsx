import React, { useState } from 'react'
import Task from './Task'
import SocialIcon from './SocialIcon'


const TasksPanel = () => {
    const [tasksPanelVisible, setTasksVisible] = useState(false)
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
        }
    ]




    return (
        <div className={`mt-8  bg-[#333333] p-2 w-full rounded-md transition-all duration-500 ease-in-out
           ${tasksPanelVisible ? 'h-[86%] fixed left-0 bottom-5' : 'h-[37%] static '} `}>
            <div
                className={`flex h-8 justify-center  bg-transparent  ${window.innerWidth > 768 ? 'hidden' : ''}`}
                onClick={() => setTasksVisible(prev => !tasksPanelVisible)}
            >
                <SocialIcon icon={`ri-arrow-${tasksPanelVisible ? 'down' : 'up'}-wide-fill`} textColor='white' />
            </div>
            <div className={`flex relative justify-center md:justify-start flex-wrap h-[80%] w-full overflow-y-auto hide-scrollbar ${tasksPanelVisible ? 'h-[90%] gap-2' : 'h-[80%] -gap-10'}`}>
                {tasks.map((value, idx) => (
                    <Task id={idx} title={value.title} task={value.task} priority={value.priority} dueDate={value.dueDate} />
                ))}
            </div>
        </div >
    )
}

export default TasksPanel