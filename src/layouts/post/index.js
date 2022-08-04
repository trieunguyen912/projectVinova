import { TablePagination } from '@mui/material';
import axios from 'axios';
import { id } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import AddForm from './components/AddForm';
import PostList from './components/PostList';

function PostDashboard(props) {
    const [posts, setPost] = useState([])
    const [keyword, setKeyword] = useState('')
    const [pageIndex, setPageIndex] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    const handleCloseAddForm = () => {
        setOpenAddForm(false);
    };
    const [openAddForm, setOpenAddForm] = React.useState(false);

    const handleAddPost = () => {
        setOpenAddForm(true);
    }

    const POSTS_URL = "https://vibonus-dev-api.vinova.sg/api/posts"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMiIsImp0aSI6ImJjMGYxMWVlLTFkMGItNDY0ZS04NTY4LWQ4YzU2ZGRhNTgzNyIsImlhdCI6MTY1OTU3ODQ1MSwiVmlib251czpVc2VyTmFtZSI6Imxlb24iLCJWaWJvbnVzOkVtYWlsIjoibGVvbkB2aW5vdmEuY29tLnNnIiwiVmlib251czpJZCI6IjEyIiwiVmlib251czpVc2VySWQiOiI4NTZjM2Y5OC1kYzgxLTRjYWUtYmU2ZC0zZDYyZTExZmZhYWQiLCJuYmYiOjE2NTk1Nzg0NTEsImV4cCI6MTY1OTU4OTI1MSwiaXNzIjoiVmlib251cyIsImF1ZCI6IlZpYm9udXMifQ.akSI2Hh5tv6rSbL38NDs_o9R1GOA7IusuSKt4DQNjp0"
    
    useEffect(()=>{
        handleGetPostList()
        console.log('load')
    }, [keyword, pageIndex, pageSize])

    const handleGetPostList = async() => {
       await axios.get(`${POSTS_URL}?PageIndex=${pageIndex}&PageSize=${pageSize}&Keyword=${keyword}`, {headers: {"Authorization" : `Bearer ${token}`}}).then(res=>{
        setPost(res.data.result.data)
       }).catch(err=>{})
    }

    const handleChangePage = (event, newPage) => {
        setPageIndex(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageIndex(1);
    };

    return (
        <div className='head'>
            <div className='menu'>
                <div className='search'>
                    <label>Search</label>
                    <input onChange={(e)=>setKeyword(e.target.value)}/>
                </div>
                <div className='create'>
                <button onClick={()=>handleAddPost()}> +Create</button>
                
                </div>
            </div>
            <hr/>
           
            {/* them */}
            <PostList posts={posts} />

            <TablePagination
                component="div"
                count={100}
                page={pageIndex}
                onPageChange={handleChangePage}
                rowsPerPage={pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> 
            <AddForm
                open={openAddForm}
                onClose={handleCloseAddForm}
            />     
        </div>
    );
}

export default PostDashboard;