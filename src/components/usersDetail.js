import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function UsersDetail() {
    const apiURL = 'https://vibonus-dev-api.vinova.sg/'
    const [loading, setLoading] = useState(false)
    //const [reqErr, setReqErr] = useState()
    const { register, reset, handleSubmit, formState: { errors } } = useForm({})
    const param = useParams()
    const id = param?.id
    const navigate = useNavigate()

    const getUser = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`${apiURL}api/admin/users/${id}`)
            console.log(result.data.result)
            //setHolder(result.data.result)
            reset({
                "avatar": result.data.result.avatar,
                "coverImage": result.data.result.coverImage,
                "bio": result.data.result.bio,
                "isRequirePasswordToGivePoint": result.data.result.isRequirePasswordToGivePoint,
                "givePoint": result.data.result.givePoint,
                "redeemPoint": result.data.result.redeemPoint,
                "allowanceBoots": result.data.result.allowanceBoots,
                "type": result.data.result.type
            })
            setLoading(false)
        }
        catch (err) {
            //setReqErr(err.message)
        }
    }
    const handleUpdate = (updateValue) => {
        setLoading(true)
        axios.put(`${apiURL}api/admin/users`, {
            "id": id,
            "avatar": updateValue.avatar,
            "coverImage": updateValue.coverImage,
            "bio": updateValue.bio,
            "isRequirePasswordToGivePoint": updateValue.isRequirePasswordToGivePoint,
            "givePoint": updateValue.givePoint,
            "redeemPoint": updateValue.redeemPoint,
            "allowanceBoots": updateValue.allowanceBoots,
            "type": updateValue.type
        }
        ).then(() => {
            setLoading(false)
            navigate('/users')
        })
    }
    useEffect(() => {
        getUser()
        // eslint-disable-next-line
    }, [])

    if (loading)
        return <CircularProgress sx={{ margin: 30 }} />
    else
        return (
            <>
                <h1>Edit user with ID: {`${id}`}</h1>

                <div style={{ width: 400 }}>
                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'ID'}
                        //defaultValue={holder.id}
                        variant="standard"
                        {...register('id')} />

                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Avatar'}
                        //defaultValue={holder.avatar}
                        variant="standard"
                        {...register('avatar')} />

                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Cover image'}
                        //defaultValue={holder.coverImage}
                        variant="standard"
                        {...register('coverImage')} />

                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Bio'}
                        //defaultValue={holder.bio}
                        variant="standard"
                        {...register('bio')} />

                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Is required password to give point'}
                        //defaultValue={holder.isRequirePasswordToGivePoint}
                        variant="standard"
                        {...register('isRequirePasswordToGivePoint')} />

                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Give point'}
                        //defaultValue={holder.givePoint}
                        variant="standard"
                        {...register('givePoint', { pattern: { value: /^[0-9]*$/, message: 'Only numbers are allowed' } })} />
                    {errors.givePoint && <p style={{ margin: '20px', color: 'red' }}>{errors.givePoint.message}</p>}

                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Redeem point'}
                        //defaultValue={holder.redeemPoint}
                        variant="standard"
                        {...register('redeemPoint', { pattern: { value: /^[0-9]*$/, message: 'Only numbers are allowed' } })} />
                    {errors.redeemPoint && <p style={{ margin: '20px', color: 'red' }}>{errors.redeemPoint.message}</p>}


                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Allowance boots'}
                        //defaultValue={holder.allowanceBoots}
                        variant="standard"
                        {...register('allowanceBoots', { pattern: { value: /^[0-9]*$/, message: 'Only numbers are allowed' } })} />
                    {errors.allowanceBoots && <p style={{ margin: '20px', color: 'red' }}>{errors.allowanceBoots.message}</p>}


                    <TextField
                        sx={{ width: 1, m: 2 }}
                        label={'Type'}
                        //defaultValue={holder.type}
                        variant="standard"
                        {...register('type', { pattern: { value: /^[0-9]*$/, message: 'Only numbers are allowed' } })} />
                    {errors.type && <p style={{ margin: '20px', color: 'red' }}>{errors.type.message}</p>}

                    <Button variant="text" onClick={handleSubmit(handleUpdate)} >Update</Button>
                    <Button variant="text" onClick={() => navigate('/users')} >Back to user list</Button>

                </div>



            </>
        )
}
