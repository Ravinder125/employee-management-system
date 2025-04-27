import React, { useContext, useEffect } from 'react'
import { EmployeeDataContext } from '../context/EmployeeContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const EmployeeProtectWrapper = ({ children }) => {
    const { employeeData, setEmployeeData } = useContext(EmployeeDataContext)
    const navigate = useNavigate()
    const Url = 'http://localhost:4000/api/v1/users'

    useEffect(() => {
        const AuthEmployee = async () => {
            try {
                const response = await axios.get(`${Url}/profile`, { withCredentials: true })
                setEmployeeData(response.data.data)
                console.log(response.data)
            } catch (error) {
                console.error('Error:', error)
                navigate('/auth')
            }
        }
        AuthEmployee()
    }, [navigate]);

    return (
        <>
            {children}
        </>
    )
}

export default EmployeeProtectWrapper