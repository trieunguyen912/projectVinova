import React, { useState } from 'react'
import axios from 'axios'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function Users() {
    const apiURL = 'https://vibonus-dev-api.vinova.sg/'
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwianRpIjoiNTc4YzI3ZWQtYzJlOC00YmE3LWE1MzUtYTQ2Yjk3YThjNGQ4IiwiaWF0IjoxNjU4ODIxMTQ2LCJWaWJvbnVzOlVzZXJOYW1lIjoic2NhcmxldCIsIlZpYm9udXM6RW1haWwiOiJzY2FybGV0QHZpbm92YS5jb20uc2ciLCJWaWJvbnVzOklkIjoiNyIsIlZpYm9udXM6VXNlcklkIjoiMzNhNTI3ZTctOGU1Ni00YWEwLWFjMWQtOTQwODkzOTUyYTI1IiwibmJmIjoxNjU4ODIxMTQ2LCJleHAiOjE2NTg4MzE5NDYsImlzcyI6IlZpYm9udXMiLCJhdWQiOiJWaWJvbnVzIn0.tDmPzW8QHAIUBvqooyK-ZfPFk8dUkyNIGEF0jADleZI'
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(false)
    // eslint-disable-next-line
    const [reqErr, setReqErr] = useState()

    // const authAxios = axios.create({
    //     baseURL: apiURL,
    //     headers: {
    //         authorization: `Bearer ${token}`
    //     }
    // })

    const callListData = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`${apiURL}api/admin/users`)
            setUsersList(result.data.result.data)
            setLoading(false)
        }
        catch (err) {
            setReqErr(err.message)
        }
    }
    const handleSearch = async (e) => {
        try {
            setLoading(true)
            const result = await axios.get(`${apiURL}api/admin/users`, {
                params: {
                    keyword: e.target.value
                }
            })
            setUsersList(result.data.result.data)
            setLoading(false)
        }
        catch (err) {
            setReqErr(err.message)
        }
    }
    const sortUpID = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`${apiURL}api/admin/users`, {
                params: {
                    SortBy: 'id',
                    SortOrder: 'asc'
                }
            })
            setUsersList(result.data.result.data)
            setLoading(false)
        }
        catch (err) {
            setReqErr(err.message)
        }
    }
    const sortDownID = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`${apiURL}api/admin/users`, {
                params: {
                    SortBy: 'id',
                    SortOrder: 'desc'
                }
            })
            setUsersList(result.data.result.data)
            setLoading(false)
        }
        catch (err) {
            setReqErr(err.message)
        }
    }
    const handleDelete = async (DeleteID) => {
        try {
            setLoading(true)
            await axios.delete(`${apiURL}api/admin/users`, {
                params: {
                    userid: DeleteID
                }
            }).then(() => {
                setLoading(false)
                callListData()
            })

        }
        catch (err) {
            setReqErr(err.message)
        }
    }

    if (loading)
        return <CircularProgress sx={{ margin: 30 }} />
    else
        return (
            <div>
                <h1>Users</h1>
                <TextField sx={{ mb: 3 }} id="standard-basic" label="Search" variant="standard" onKeyPress={e => { e.key === 'Enter' && handleSearch(e) }} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    ID
                                    <ArrowUpwardIcon sx={{ fontSize: 'medium' }} onClick={() => sortUpID()} />
                                    <ArrowDownwardIcon sx={{ fontSize: 'medium' }} onClick={() => sortDownID()} />
                                </TableCell>
                                <TableCell>
                                    Name
                                </TableCell>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>
                                    Created on
                                </TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersList.map((element) => (
                                <TableRow
                                    key={element.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{element.id}</TableCell>
                                    <TableCell>{element.name}</TableCell>
                                    <TableCell>{element.userName}</TableCell>
                                    <TableCell>{element.creationTime}</TableCell>
                                    <TableCell>
                                        <Stack
                                            direction="row"
                                            divider={<Divider orientation="vertical" flexItem />}
                                            spacing={2}
                                        >
                                            <BuildIcon />
                                            <DeleteIcon onClick={() => handleDelete(element.id)} />
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack sx={{ width: 250 }} spacing={4} >
                    <Button variant="text" onClick={() => callListData()} >Get list</Button>
                    <Button variant="text" >Create a new user</Button>
                </Stack>
            </div>
        )
}

