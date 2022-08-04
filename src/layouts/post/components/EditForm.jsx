import { Box, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { getValue } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { id } from 'date-fns/locale';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

function EditForm(props) {

    const POSTS_URL = "https://vibonus-dev-api.vinova.sg/api/admin/posts"
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMiIsImp0aSI6IjBiZDc2MGNiLTZiYjItNGNjYi1hNmNlLWFlYzg4NWY4ZWY1MyIsImlhdCI6MTY1OTU5MDQzMiwiVmlib251czpVc2VyTmFtZSI6Imxlb24iLCJWaWJvbnVzOkVtYWlsIjoibGVvbkB2aW5vdmEuY29tLnNnIiwiVmlib251czpJZCI6IjEyIiwiVmlib251czpVc2VySWQiOiI4NTZjM2Y5OC1kYzgxLTRjYWUtYmU2ZC0zZDYyZTExZmZhYWQiLCJuYmYiOjE2NTk1OTA0MzIsImV4cCI6MTY1OTYwMTIzMiwiaXNzIjoiVmlib251cyIsImF1ZCI6IlZpYm9udXMifQ.EAXVgKBXcOkRUd3kijB4-M0bdksT6HJTkL_-TIE8tdA"
   
    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const { onClose, post, open } = props;

    const handleClose = () => {
        onClose();
    };
    const handleListItemClick = (value) => {
        onClose(value);
    };

    console.log("post", post)

    const handleEditPost = async (data) =>{
        await axios.put(POSTS_URL, {data}, {headers: {"Authorization" : `Bearer ${token}`}} ).then(res=>{}).catch(err=>{})
    }

    const onSubmit =(e) =>{
        e.preventDefault();
    }

   //thêm
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const handleNewUser = async (formValue) => {
        setLoading(true)
        axios.put(`${POSTS_URL}api/admin/posts`, {
            "categoryId": formValue.categoryId,
            "postId": formValue.PostId,
            "userId": formValue.UserId,
            "guid": formValue.Guid,
            "title": formValue.Title,
            "content": formValue.Content,
            "slug": formValue.Slug,
            "thumbnail": formValue.Thumbnail,
            "status": formValue.Status,
            "totalViews": formValue.TotalViews,
            "type": formValue.Type,
            "approvedBy": formValue.ApprovedBy,
            "approveDateTime": formValue.ApproveDateTime
        })
            .then(() => {
                setLoading(false)
                navigate('/posts')
            })
    }

    if (loading)
        return <CircularProgress sx={{ margin: 30 }} />
    else


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>POST EDIT</DialogTitle>
        <Box minWidth={400} minHeight={500} sx={{p: 3}}>
        {post&&(
            //thêm
            <form onSubmit={onSubmit(handleNewUser)}>

        <div style={{ width: 400 }}>
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="CategoryId"
            variant='standard'
            {...register('CategoryId', { required: { value: true, message: 'First name is required'} })}
        />

        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="PostId"
            variant='standard'
            {...register('PostId', { required: { value: true, message: 'First name is required'} })}
        />

        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="UserId"
            variant='standard'
            {...register('UserId', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Guid"
            variant='standard'
            {...register('Guid', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
        value={post.title}
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Title"
            variant='standard'
            {...register('Title', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Content"
            variant='standard'
            {...register('Content', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Slug"
            variant='standard'
            {...register('Slug', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Thumbnail"
            variant='standard'
            {...register('Thumbnail', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Status"
            variant='standard'
            {...register('Status', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="TotalViews"
            variant='standard'
            {...register('TotalViews', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="Type"
            variant='standard'
            {...register('Type', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="ApprovedBy"
            variant='standard'
            {...register('ApprovedBy', { required: { value: true, message: 'First name is required'} })}
        />
        <TextField 
            sx={{ width: 1, m: 2 }}
            id = "standard-basic"
            label ="ApproveDateTime"
            variant='standard'
            {...register('ApproveDateTime', { required: { value: true, message: 'First name is required'} })}
        />
        <Button variant='text' >Submit</Button>
    </div>
</form>
        )}
        
        </Box>
    </Dialog>
  )
}

export default EditForm