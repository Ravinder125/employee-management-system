import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from '../pages/Start'
import EmployeeRegister from '../pages/EmployeeAuth'

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Start />} />
                <Route path='/register' element={<EmployeeRegister />} />
                <Route path='/login' />
                <Route path='/home' />
                <Route path='/dashboard' />
                <Route path='/profile' />
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