import React, { createContext, useState } from 'react'


export const AdminDataContext = createContext()

const AdminContext = ({ children }) => {
    const [adminData, setAdminData] = useState({})
    return (
        <div>
            <AdminDataContext.Provider value={{ adminData, setAdminData }}>
                {children}
            </AdminDataContext.Provider>
        </div>
    )
}

export default AdminContext