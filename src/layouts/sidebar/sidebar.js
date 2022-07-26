import React from 'react'
import "./sidebar.css"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import GroupIcon from '@mui/icons-material/Group';
import GradeIcon from '@mui/icons-material/Grade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate=useNavigate();

  const handlePages = (event)=>{
    switch (event.currentTarget.id){
      case 'users':
        navigate('/users');
        break;
      case 'post':
        navigate('/post');
        break;
      case 'category':
        navigate('/category');
        break;
      case 'reward':
        navigate('/reward');
        break;
      case 'setting':
        navigate('/settings');
        break;
      default:
        navigate('/')
    }
  }

  return (
      <div className='sidebarWrapper'>
        <span id="admin" className="admin" onClick={handlePages}>ViAdmin</span>
        <div className="adminUser">
          <AccountCircleIcon fontSize="large"/>
        </div>
        <div className='sidebarMenu'>
            <List>
              <ListItem>
                <ListItemButton id='users' onClick={handlePages}>
                  <ListItemIcon>
                    <GroupIcon/>
                  </ListItemIcon>
                  <ListItemText>Users</ListItemText>
                  
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton id='post' onClick={handlePages}>
                  <ListItemIcon>
                    <LocalPostOfficeIcon/>
                  </ListItemIcon>
                  <ListItemText>Post</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton id='category' onClick={handlePages}>
                  <ListItemIcon>
                    <DynamicFeedIcon/>
                  </ListItemIcon>
                  <ListItemText>Post Categories</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton id='reward' onClick={handlePages}>
                  <ListItemIcon>
                    <GradeIcon/>
                  </ListItemIcon>
                  <ListItemText>Reward</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton id='setting' onClick={handlePages}>
                  <ListItemIcon>
                    <SettingsIcon/>
                  </ListItemIcon>
                  <ListItemText>Setting</ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
        </div>
      </div>
  )
}

export default Sidebar