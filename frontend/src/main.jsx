import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import EmployeeContext from './context/EmployeeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EmployeeContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EmployeeContext>
  </StrictMode>,
)
