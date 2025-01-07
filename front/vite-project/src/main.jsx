import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./reset.css"
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import { UsersProvider } from './contex/UsersContex.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <UsersProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UsersProvider>
    </StrictMode>
)