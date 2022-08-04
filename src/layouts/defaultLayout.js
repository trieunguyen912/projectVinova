import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Sidebar from './sidebar/sidebar'
import '../App.css'

function DefaultLayout({ children }) {

    const [open, setOpen] = useState(true)

    const navToggle = () => {
        setOpen(!open)
    }

    return (
        <div className='container'>
            <div id='sidebar' className={open ? 'sidebar' : 'sidebarClose'}>
                <Sidebar />
            </div>
            <div id='main' className="main">
                <div className="mainTabWrapper">
                    <MenuIcon onClick={navToggle} />
                    <hr />
                </div>
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout