import React, { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { TablePagination } from '@mui/material';
import moment from 'moment';

export default function Users() {
    const apiURL = 'https://vibonus-dev-api.vinova.sg/'
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwianRpIjoiNTc4YzI3ZWQtYzJlOC00YmE3LWE1MzUtYTQ2Yjk3YThjNGQ4IiwiaWF0IjoxNjU4ODIxMTQ2LCJWaWJvbnVzOlVzZXJOYW1lIjoic2NhcmxldCIsIlZpYm9udXM6RW1haWwiOiJzY2FybGV0QHZpbm92YS5jb20uc2ciLCJWaWJvbnVzOklkIjoiNyIsIlZpYm9udXM6VXNlcklkIjoiMzNhNTI3ZTctOGU1Ni00YWEwLWFjMWQtOTQwODkzOTUyYTI1IiwibmJmIjoxNjU4ODIxMTQ2LCJleHAiOjE2NTg4MzE5NDYsImlzcyI6IlZpYm9udXMiLCJhdWQiOiJWaWJvbnVzIn0.tDmPzW8QHAIUBvqooyK-ZfPFk8dUkyNIGEF0jADleZI'
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    // eslint-disable-next-line
    const [reqErr, setReqErr] = useState()
    const navigate = useNavigate()

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
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
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
    useEffect(() => {
        callListData()
    }, [])

    if (loading)
        return <CircularProgress sx={{ margin: 30 }} />
    else
        return (
            <div>
                <h1>Users</h1>
                <Stack sx={{ width: '100%', m: 2 }} spacing={100} direction="row" >
                    <TextField sx={{ mb: 3 }} id="standard-basic" label="Search" variant="standard" onKeyPress={e => { e.key === 'Enter' && handleSearch(e) }} />
                    <Button variant="text" onClick={() => navigate('/userForm')}>Create a new user</Button>
                </Stack>
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
                            {usersList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((element) => (
                                    <TableRow
                                        key={element.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{element.id}</TableCell>
                                        <TableCell>{element.name}</TableCell>
                                        <TableCell>{element.userName}</TableCell>
                                        <TableCell>{moment(element.creationTime).format('DD/MM+YYYY HH:mm:ss')}</TableCell>
                                        <TableCell>
                                            <Stack
                                                direction="row"
                                                divider={<Divider orientation="vertical" flexItem />}
                                                spacing={2}
                                            >
                                                <BuildIcon onClick={() => navigate(`/users/${element.id}`)} />
                                                <DeleteIcon onClick={() => handleDelete(element.id)} />
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={usersList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </div>
        )
}

