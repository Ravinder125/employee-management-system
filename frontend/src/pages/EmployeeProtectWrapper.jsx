import React, { useContext, useEffect } from 'react'
import { EmployeeDataContext } from '../context/EmployeeContext'
import { authEmployee } from '../services/employee.service'
import { useNavigate } from 'react-router-dom'

const EmployeeProtectWrapper = ({ children }) => {
    const { employeeData, setEmployeeData } = useContext(EmployeeDataContext)
    const navigate = useNavigate()

    useEffect(() => {
        const AuthEmployee = async () => {
            try {
                const response = await authEmployee()
                setEmployeeData(response.data.data)
                console.log(response.data)
            } catch (error) {
                console.error('Error:', error)
                navigate('/login')
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