import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='flex justify-between'>
            <div className='leading-none'>
                <h2>Hello,</h2>
                <h1 className='text-3xl'>Ravinder 👋</h1>
            </div>
            <Link to='/logout' className='cursor-pointer self-end bg-red-400 font-medium px-3 py-1 rounded-md'>Log Out</Link>
        </div>
    )
}

export default Header