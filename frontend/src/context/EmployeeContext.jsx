import React, { createContext, useState } from 'react'


export const EmployeeDataContext = createContext()

const EmployeeContext = ({ children }) => {
    const [employeeData, setEmployeeData] = useState({})
    return (
        <div>
            <EmployeeDataContext.Provider value={{ employeeData, setEmployeeData }}>
                {children}
            </EmployeeDataContext.Provider>
        </div>
    )
}

export default EmployeeContext