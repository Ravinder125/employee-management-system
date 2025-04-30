import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from '../pages/Start'
import EmployeeDashboard from '../pages/EmployeeDashboard'
import EmployeeProtectWrapper from '../pages/EmployeeProtectWrapper.jsx'
import EmployeeRegister from '../pages/EmployeeRegister.jsx'
import EmployeeLogin from '../pages/EmployeeLogin.jsx'
import EmployeeLogout from '../pages/EmployeeLogout.jsx'
import AdminRegister from '../pages/AdminRegister.jsx'
import AdminLogin from '../pages/AdminLogin.jsx'
import AdminProtectWrapper from '../pages/AdminProtectWrapper.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import AdminLogout from '../pages/AdminLogout.jsx'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Start />} />
                <Route path='/register' element={<EmployeeRegister />} />
                <Route path='/logout' element={
                    <EmployeeProtectWrapper>
                        <EmployeeLogout />
                    </EmployeeProtectWrapper>
                } />
                <Route path='/login' element={<EmployeeLogin />} />
                {/* <Route path='/home' /> */}
                <Route path='/dashboard' element={
                    <EmployeeProtectWrapper>
                        <EmployeeDashboard />
                    </EmployeeProtectWrapper>
                } />
                < Route path='/profile' />
                <Route path='/admin-register' element={<AdminRegister />} />
                <Route path='/admin-login' element={<AdminLogin />} />
                <Route path='/admin-logout' element={<AdminLogout />} />
                <Route path='/admin-home' />
                <Route path='/admin-dashboard' element={
                    <AdminProtectWrapper>
                        <AdminDashboard />
                    </AdminProtectWrapper>
                } />
                <Route path='/admin-profile' />
                <Route path='/admin-logout' />
            </Routes>
        </div>
    )
}

export default AppRoutes