import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
    return (
        <div>
            <Link className='text-3xl justify-center items-center flex w-full min-h-screen underline text-black' to='/register'>
                Register
            </Link>
        </div>
    )
}

export default Start