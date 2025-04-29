import React from 'react'
import { useEffect } from 'react'
import { logoutEmployee } from '../services/employee.service'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

const EmployeeLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await logoutEmployee()
                console.log('Employee successfully logout', response.data.data)
            } catch (error) {
                console.log('Error:', error)
            } finally {
                navigate('/login')
            }
        }
        handleLogout()
    }, [])

    return (
        <Loading />
    )
}

export default EmployeeLogout