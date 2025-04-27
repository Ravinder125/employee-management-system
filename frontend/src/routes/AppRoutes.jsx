import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from '../pages/Start'
import EmployeeAuth from '../pages/EmployeeAuth.jsx'
import EmployeeDashboard from '../pages/EmployeeDashboard'
import EmployeeProtectWrapper from '../pages/EmployeeProtectWrapper.jsx'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Start />} />
                <Route path='/auth' element={<EmployeeAuth />} />
                <Route path='/login' />
                {/* <Route path='/home' /> */}
                <Route path='/dashboard' element={
                    <EmployeeProtectWrapper>
                        <EmployeeDashboard />
                    </EmployeeProtectWrapper>
                } />
                < Route path='/profile' />
                <Route path='/logout' />

                <Route path='/admin-register' />
                <Route path='/admin-login' />
                <Route path='/admin-home' />
                <Route path='/admin-dashboard' />
                <Route path='/admin-profile' />
                <Route path='/admin-logout' />
            </Routes>
        </div>
    )
}

export default AppRoutes