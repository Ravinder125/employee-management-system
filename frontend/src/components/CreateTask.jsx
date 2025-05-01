import React, { useState } from 'react'
import SocialIcon from './SocialIcon'
import Input from './Input'
import { createTask } from '../services/task.service'
import Loading from '../components/Loading'

const CreateTask = (props) => {
    const { setCreateTaskPanel } = props.createTaskPanel;
    const { employees, setEmployees } = props.employees
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        assignedTo: '',
        priority: 'medium',
        date: '',
        category: ''
    })

    const [isLoading, setILoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [apiError, setApiError] = useState('')

    const validate = (name, value) => {
        switch (name) {
            case 'title':
                if (value.length < 5) {
                    return 'Title must be at least 5 characters long';
                }
                break;
            case 'description':
                if (value.length > 500) {
                    return 'Description must not exceed 500 characters';
                }
                break;
            case 'date':
                const currentDate = new Date();
                const selectDate = new Date(value);
                console.log(selectDate, currentDate)
                if (selectDate < currentDate) {
                    return 'Date cannot be in the past';
                }
            default:
                return '';
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'assing-to') {
            setFormData(prev => ({ ...prev, [name]: value }));
            setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        }
        if (!value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (errors) {
        //     return alert('Please fix the errors before submitting the form')
        // }

        // if (!formData.title || !formData.description || !formData.AssingTo || !formData.priority || !formData.date) {
        //     return alert('Please fill all the fields');
        // }
        const taskData = {
            title: formData.title,
            description: formData.description,
            assignedTo: formData.assignedTo,
            priority: formData.priority,
            date: formData.date
        }
        console.log(taskData)
        setILoading(true)
        try {
            const response = await createTask(taskData);
            if (response.status === 201) {
                console.log('Task created successfully', response.data.data);
            }
        } catch (error) {
            setApiError('Failed to create task');
            console.error(error);

        } finally {
            // setFormData({
            //     title: '',
            //     description: '',
            //     assignedTo: '',
            //     priority: 'medium',
            //     date: '',
            //     category: ''
            // })
            setILoading(false)
        }
    }
    if (isLoading) {
        return <div><Loading /></div>
    }
    return (
        <div className='w-full h-full p-3 bg-[#222222] rounded-md overflow-auto hide-scrollbar'>
            <div className='flex items-center gap-2'>
                <button onClick={() => setCreateTaskPanel(false)} className='hover:bg-[#111111] text-white rounded-md'>
                    <SocialIcon icon='ri-arrow-left-line' hW='h-10 w-10' textSize='text-3xl' />
                </button>
                <h1 className='text-2xl'>Create Task</h1>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 p-3'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="Title" className='font-medium'>Task Title</label>
                    <Input
                        type="title"
                        name="title"
                        value={formData.title}
                        placeholder="Make a UI design"
                        onChange={handleInputChange}
                        error={errors.title}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='Description' className='font-medium'>Description</label>
                    <textarea
                        name='description'
                        value={formData.description}
                        placeholder='Detailed description of task (Max 500 words)'
                        onChange={handleInputChange}
                        maxLength={500}
                        className='bg-[#333333] text-gray-50 rounded-md p-2 text-sm w-full max-h-32 h-32 overflow-auto hide-scrollbar focus:outline-none '
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor="Date" className='font-medium'>Date</label>
                    <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        placeholder="Enter your password again"
                        onChange={handleInputChange}
                        error={errors.date}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='assignedTo' className='font-medium'>Assign To</label>
                    <select
                        name='assignedTo'
                        value={formData.assignedTo}
                        onChange={handleInputChange}
                        className='bg-[#333333] text-gray-50 rounded-md p-2 text-sm w-full '
                    >
                        <option value="" disabled>Select an employee</option>
                        {employees.map((member, id) => (
                            <option
                                className='text-white bg-black'
                                key={id}
                                value={member.username}>
                                {member.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='Priority' className='font-medium'>Priority</label>
                    <select
                        name='priority'
                        value={formData.priority}
                        onChange={handleInputChange}
                        className='bg-[#333333] text-gray-50 rounded-md p-2 text-sm w-full '
                    >
                        {['medium', 'high', 'low'].map((priority, id) => (
                            <option
                                className='text-white bg-black'
                                key={id}
                                value={formData.priority}>
                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col gap-2' >
                    <label htmlFor="Category">Category</label>
                    <Input
                        type='text'
                        name='category'
                        value={formData.category}
                        placeholder='Design, Development, etc'
                        onChange={handleInputChange}
                    />
                </div>
                <button type='submit' className='mt-1 bg-black p-2 rounded-md font-bold text-lg'>Create Task</button>
            </form >
        </div >
    )
}

export default CreateTask