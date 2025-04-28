import React, { useContext, useEffect } from 'react'
import { AdminDataContext } from '../context/AdminContext'
import { authAdmin } from '../services/admin.service'
import { useNavigate } from 'react-router-dom'

const AdminProtectWrapper = ({ children }) => {
    const { adminData, setAdminData } = useContext(AdminDataContext)
    const navigate = useNavigate()

    useEffect(() => {
        const AuthAdmin = async () => {
            try {
                const response = await authAdmin()
                setAdminData(response.data.data)
                console.log(response.data)
            } catch (error) {
                console.error('Error:', error)
                navigate('/admin-login')
            }
        }
        AuthAdmin()
    }, [navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default AdminProtectWrapper