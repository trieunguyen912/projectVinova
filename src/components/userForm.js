import React, { useState } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function UsersForm() {
    const apiURL = 'https://vibonus-dev-api.vinova.sg/'
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm({})
    const navigate = useNavigate()

    const handleNewUser = async (formValue) => {
        setLoading(true)
        axios.post(`${apiURL}api/admin/users`, {
            "emailAddress": formValue.Email,
            "username": formValue.Username,
            "name": formValue.Name,
            "surname": formValue.Surname,
            "password": formValue.Password,
            "avatar": formValue.Avatar,
            "coverImage": formValue.CoverImage,
            "bio": formValue.Bio,
            "isRequirePasswordToGivePoint": formValue.PasswordGivePoints,
            "givePoint": formValue.GivePoints,
            "redeemPoint": formValue.RedeemPoints,
            "allowanceBoots": formValue.Allowance,
            "type": formValue.Type
        })
            .then(() => {
                setLoading(false)
                navigate('/users')
            })
    }

    if (loading)
        return <CircularProgress sx={{ margin: 30 }} />
    else
        return (
            <div style={{ width: 400 }}>
                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    {...register('Name', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Surname"
                    variant="standard"
                    {...register('Surname', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Username"
                    variant="standard"
                    {...register('Username', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    {...register('Email', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    {...register('Password', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Avatar"
                    variant="standard"
                    {...register('Avatar', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Cover image"
                    variant="standard"
                    {...register('CoverImage', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Bio"
                    variant="standard"
                    {...register('Bio', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Require password to give points"
                    variant="standard"
                    {...register('PasswordGivePoints', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Give points"
                    variant="standard"
                    {...register('GivePoints', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Redeem point"
                    variant="standard"
                    {...register('RedeemPoints', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Allowance boots"
                    variant="standard"
                    {...register('Allowance', { required: { value: true, message: 'First name is required' } })} />

                <TextField
                    sx={{ width: 1, m: 2 }}
                    id="standard-basic"
                    label="Type"
                    variant="standard"
                    {...register('Type', {
                        required: { value: true, message: 'First name is required' },
                        pattern: { value: /^[0-9]*$/, message: 'Only numbers are allowed' }
                    })} />
                {errors.type && <p style={{ margin: '20px', color: 'red' }}>{errors.type.message}</p>}

                <Button variant="text" onClick={handleSubmit(handleNewUser)} >Submit</Button>
                <Button variant="text" onClick={() => navigate('/users')} >Back to user list</Button>

            </div>
        )
}