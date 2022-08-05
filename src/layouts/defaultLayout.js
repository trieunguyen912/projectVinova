import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import Sidebar from './sidebar/sidebar'
import '../App.css'
import { useNavigate } from "react-router-dom"
function DefaultLayout({children}) {

  const [open, setOpen] =useState(true)

  const navToggle = () =>{
    setOpen(!open)
  }
  const navigate = useNavigate();
  const goBack = () => navigate("/login");
  return (
    <div className='container'>
      <div id='sidebar' className={open ? 'sidebar' : 'sidebarClose'}>
        <Sidebar/>
      </div>
      <div id='main' className="main">
        <div className="mainTabWrapper">
          <MenuIcon onClick={navToggle}/>
          <hr/>
          <div className="flexGrow">
          <button onClick={goBack}>Go Back</button>
      </div>
        </div>        
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout