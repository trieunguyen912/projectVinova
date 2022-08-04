import { Button, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import EditForm from './EditForm';
import AddForm from './AddForm';
import axios from 'axios';
function PostList({posts}) {
    const POSTS_URL = "https://vibonus-dev-api.vinova.sg/api/posts"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMiIsImp0aSI6IjBiZDc2MGNiLTZiYjItNGNjYi1hNmNlLWFlYzg4NWY4ZWY1MyIsImlhdCI6MTY1OTU5MDQzMiwiVmlib251czpVc2VyTmFtZSI6Imxlb24iLCJWaWJvbnVzOkVtYWlsIjoibGVvbkB2aW5vdmEuY29tLnNnIiwiVmlib251czpJZCI6IjEyIiwiVmlib251czpVc2VySWQiOiI4NTZjM2Y5OC1kYzgxLTRjYWUtYmU2ZC0zZDYyZTExZmZhYWQiLCJuYmYiOjE2NTk1OTA0MzIsImV4cCI6MTY1OTYwMTIzMiwiaXNzIjoiVmlib251cyIsImF1ZCI6IlZpYm9udXMifQ.EAXVgKBXcOkRUd3kijB4-M0bdksT6HJTkL_-TIE8tdA"
    
    const [openEditForm, setOpenEditForm] = React.useState(false);
    
    const [postSelect, setPostSelect] = React.useState()
    
    const handleCloseEditForm = () => {
        setOpenEditForm(false);
    };
    
    const handleEditPost = (post) => {
        setPostSelect(post)
        setOpenEditForm(true);
    }

    const handleDelete = async (postId) =>{
        await axios.delete(POSTS_URL+'/'+postId, {headers: {"Authorization" : `Bearer ${token}`}} ).then(res=>{}).catch(err=>{})
    }
    
    return (
        <div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="left">CategoryId </TableCell>
                    <TableCell align="left">PostId </TableCell>
                    <TableCell align="left">UserId </TableCell>
                    <TableCell align="left">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {posts.map((post) => (
                    <TableRow key={post.id}>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.totalViews}</TableCell>
                            <TableCell>{post.totalViews}</TableCell>
                            <TableCell>{post.totalViews}</TableCell>
                            <TableCell>
                                <Button onClick={()=>handleEditPost(post)}>
                                    <ModeIcon/>
                                </Button>
                                <Button onClick={()=>handleDelete(post.id)}>
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        <EditForm
            post={postSelect}
            open={openEditForm}
            onClose={handleCloseEditForm}
        />
       </div>
    );
}

export default PostList;