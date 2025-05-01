import React, { useState } from 'react'
import Header from './Header'
import SocialIcon from './SocialIcon'
import Input from './Input'

const CreateTask = (props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        AssingTo: '',
        priority: 'medium',
        date: '',
        category: ''
    })

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
    const { createTask, setCreateTask } = props.createTask;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'assing-to') {
            setFormData(prev => ({ ...prev, [name]: value }));
            setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        }
        if (name === 'assign-to') {
            setFormData(prev => ({ ...prev, 'AssingTo': value }));
        }
        if (!value) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }

    const members = [
        {
            id: 1,
            email: 'john.doe@example.com',
            username: 'johndoe'
        },
        {
            id: 2,
            email: 'jane.smith@example.com',
            username: 'janesmith'
        },
        {
            id: 3,
            email: 'michael.brown@example.com',
            username: 'michaelbrown'
        },
        {
            id: 4,
            email: 'emily.jones@example.com',
            username: 'emilyjones'
        }
    ];
    return (
        <div className='w-full h-full p-3 bg-[#222222] rounded-md overflow-auto hide-scrollbar'>
            <div className='flex items-center gap-2'>
                <button onClick={() => setCreateTask(false)} className='hover:bg-[#111111] text-white rounded-md'>
                    <SocialIcon icon='ri-arrow-left-line' hW='h-10 w-10' textSize='text-3xl' />
                </button>
                <h1 className='text-2xl'>Create Task</h1>
            </div>
            <form className='flex flex-col gap-3 p-3'>
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
                    <label htmlFor='assign-to' className='font-medium'>Assign To</label>
                    <select
                        name='priority'
                        value={formData.priority}
                        onChange={handleInputChange}
                        className='bg-[#333333] text-gray-50 rounded-md p-2 text-sm w-full '
                    >
                        {members.map((member, id) => (
                            <option
                                className='text-white bg-black'
                                key={id}
                                value={member.id}>
                                {member.username}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label htmlFor='assign-to' className='font-medium'>Assign To</label>
                    <select
                        name='assing-to'
                        value={formData.AssingTo}
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
                <button className='mt-1 bg-black p-2 rounded-md font-bold text-lg'>Create Task</button>
            </form >
        </div >
    )
}

export default CreateTask