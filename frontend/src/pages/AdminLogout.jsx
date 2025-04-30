import React from 'react'
import { useEffect } from 'react'
import { logoutAdmin } from '../services/admin.service'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

const AdminLogout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await logoutAdmin()
                console.log('Employee successfully logout', response.data.data)
            } catch (error) {
                console.log('Error:', error)
            } finally {
                navigate('/admin-login')
            }
        }
        handleLogout()
    }, [navigate])

    return (
        <Loading />
    )
}

export default AdminLogout