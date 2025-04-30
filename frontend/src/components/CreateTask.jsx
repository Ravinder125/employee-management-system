import React, { useState } from 'react'
import Header from './Header'
import SocialIcon from './SocialIcon'
import Input from './Input'

const CreateTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        desription: '',
        AssingTo: '',
        priority: 'medium',
        date: '',
        category: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'assign-t0') {
            setFormData(prev => ({ ...prev, 'AssingTo': value }));
        }
    }
    return (
        <div className='absolute top-0 left-0 w-full h-full p-3 bg-[#222222] rounded-md'>
            <div className=''>
                <div className='flex items-center gap-2'>
                    <button className='hover:bg-[#111111] text-white rounded-md'>
                        <SocialIcon icon='ri-arrow-left-line' hW='h-10 w-10' textSize='text-3xl' />
                    </button>
                    <h1 className='text-2xl'>Create Task</h1>
                </div>
                <form>
                    <div>
                        <label htmlFor="title">Task Title</label>
                        <Input
                            type="title"
                            name="title"
                            value={formData.date}
                            placeholder="Make a UI design"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            name='description'
                            value={formData.desription}
                            placeholder='Detailed description of task (Max 500 word)'
                        />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            placeholder="Enter your password again"
                            onChange={handleInputChange}
                            icon="ri-calendar-line"
                        />
                    </div>
                    <div>
                        <label htmlFor="assign-to">Date</label>
                        <Input
                            type="assign-to"
                            name="assign-to"
                            value={formData.AssingTo}
                            placeholder="Enter your password again"
                            onChange={handleInputChange}
                            icon="ri-calendar-line"
                        />
                    </div>

                </form >
            </div >
        </div >
    )
}

export default CreateTask