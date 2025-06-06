import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ route, username }) => {
    return (
        <div className='flex justify-between'>
            <div className='leading-none'>
                <h2 className='text-sm'>Hello,</h2>
                <h1 className='md:text-3xl text-2xl'>{username} 👋</h1>
            </div>
            <Link to={route} className='cursor-pointer self-end bg-red-400 font-medium px-3 py-1 rounded-md'>Log Out</Link>
        </div>
    )
}

export default Header