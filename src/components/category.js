import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { TextField, Button, Box, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useForm } from 'react-hook-form'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// import { makeStyles } from "@mui/material/core";


import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

import PageIndex from './pageIndex'

function Category() {
  const [param, setParam] = useState({
    pageIndex: 1,
    pageSize: 10,
    keyword:""
  });

  const [total, setTotal] = useState(0)

  const [category, setCategory] = useState("")
  const [open, setOpen] = useState(false)

  const [openEdit, setOpenEdit] = useState(false)
  const [editID, setEditID] = useState(0);

  const [openDelete, setOpenDelete] = useState(false)
  const [deleteID, setDeleteID] = useState(0);
  // const [text, setText] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const [isSearch, setIsSearch] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const handleChange = (event) => {
    setParam({pageSize: event.target.value});
  };

  const handleSearch = (event) =>{
    console.log(getValues("searchValue"))
    // const a = category?.result?.data?.filter(e=>e.name === getValues("searchValue"))
    // console.log(a)
    setParam({keyword: event.target.value})
    event.preventDefault()
  }

  const enter = (e)=>{
    if (e.key === 'Enter'){
      handleSearch(e);
      
    }
    else if (e.key === 'Backspace'){
      if (getValues("searchValue"))
      {
        setParam({keyword: ""})
      }
    }
  }

  const {register, reset, handleSubmit, getValues} = useForm();
  
  // const useStyles = makeStyles(theme => ({
  //   customHoverFocus: {
  //     "&:hover, &.Mui-focusVisible": { transform: translateX(5) }
  //   }
  // }));

  // const classes = useStyles();

  const fetchData = async (param) =>{
    axios
      .get(`https://vibonus-dev-api.vinova.sg/api/admin/post-categories`, {params: param})
      .then((res)=>{
        const response = res.data;
        setCategory(response);
        setTotal(res.data.result.totalPages)
      })
  }

  const addCategory = async (event) =>{
    event.preventDefault();
    axios
      .post(`https://vibonus-dev-api.vinova.sg/api/admin/post-categories`,{
        "name": getValues('addCategory')
      })
      .then((e)=>{
        fetchData()
      })
      reset();
      handleClose();
  }

  const editCategory = async (e, id) =>{
    e.preventDefault();
    axios
      .put(`https://vibonus-dev-api.vinova.sg/api/admin/post-categories`,{
        "id": id,
        "name": getValues("editCategory")
      })
      .then((e)=>{
        fetchData()
      })
      reset();
      handleCloseEdit();
  }

  const update = (e, id) =>{
    e.preventDefault();
    handleOpenEdit()
    console.log(id)
    setEditID(id);
  }

  const deleteCategory = async (e, id) =>{
    axios
      .delete(`https://vibonus-dev-api.vinova.sg/api/admin/post-categories?userId=${id}`)
      .then((e)=>{
        fetchData()
      })
      e.preventDefault();
      reset();
      handleCloseDelete();
  }

  const handleDelete = (e, id) =>{
    e.preventDefault();
    handleOpenDelete();
    setDeleteID(id)
  }

  const getIdCategory = async (id) =>{
    axios
      .get(`https://vibonus-dev-api.vinova.sg/api/admin/post-categories/${id}`)
  }

  useEffect(()=>{
    fetchData(param)
  }, [param])

  useEffect(() => { console.log(category) }, [category])

  // useEffect(() => {
  //   // Set errorMessage only if text is equal or bigger than MAX_LENGTH
  //   if (text.length >= 10) {
  //     setErrorMessage(
  //       "Name Required"
  //     );
  //   }
  // }, [text]);

  // useEffect(() => {
    
  //   if (text.length < 10 && errorMessage) {
  //     setErrorMessage("");
  //   }
  // }, [text, errorMessage]);

  console.log(getValues("searchValue"))

  const paperStyle ={padding: "30px 20px 60px", fontWeight: "600", lineWeight: "5px"}
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (

    <Box sx={{boxShadow: 1, height: '100%'}}>
      <Paper style={paperStyle}>
        <h2 style={{width: '50%'}}>Categories</h2>
        <p>Create and edit your category here</p>
        <Button sx={{ position: "absolute", top: 150, right: 50, zIndex: 2000 }} variant="contained" onClick={handleOpen}>Create Category</Button>
        <TextField onKeyDown={(e)=>enter(e)} fullWidth id="outlined-error" {...register('searchValue')} label='Search' placeholder='Search' InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={()=>handleSearch(getValues('searchValue'))}/>
            </InputAdornment>
          ),
        }}></TextField>
        <Modal
          open={open}
          onClose={handleClose}
          
        >
          <Box sx={style}>
          <h3>Add New Category</h3>
          <form onSubmit={handleSubmit}>

            <TextField id="outlined-error" fullWidth {...register('addCategory')} label='Category Name'></TextField> 
            <br/>
            <br/>
            
            <Button type='submit' variant="contained" onClick={addCategory}>add categories</Button>

          </form>
          </Box>
        </Modal>
        
        <br/>
        <br/>
        <Table border="1">
          <TableHead>
            <TableRow>
              <TableCell sx={{width: 50, fontWeight: '600'}} component="th" align="center">ID</TableCell>
              <TableCell sx={{width: 150, fontWeight: '600'}} component="th" align="center">Name</TableCell>
              <TableCell sx={{width: 30, fontWeight: '600'}} component="th" align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
          {category?.result?.data?.map((e, id) => (
            <TableRow
              key={id}
            >
              <TableCell align="center">{e.id}</TableCell>
              <TableCell align="center">{e.name}</TableCell>
              <TableCell align="center"><EditIcon onClick={(event)=>update(event, e.id)}/><DeleteIcon onClick={(event)=>handleDelete(event, e.id)}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>

        {/* EDIT POPUP */}
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          
        >
          <Box sx={style}>
          <h3>Edit New Category</h3>
          <form onSubmit={handleSubmit}>

            <TextField id="outlined-error" fullWidth {...register('editCategory')} label='Category Name'></TextField> 
            <br/>
            <br/>
            
            <Button type='submit' variant="contained" onClick={(e)=>editCategory(e, editID)}>Update</Button>
            

          </form>
          </Box>
        </Modal>

        {/* DELETE POPUP */}
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          
        >
          <Box sx={style}>
          <h3>Are you sure to delete permanently this category ?</h3>
          <form onSubmit={handleSubmit}>
            <Stack spacing = {2} direction="row">
              <Button type='submit' variant="contained" onClick={(e)=>deleteCategory(e, deleteID)}>Yes</Button>
              <Button type='submit' variant="outlined" onClick={(e)=>{e.preventDefault(); handleCloseDelete()}}>No</Button>
            </Stack>
          </form>
          </Box>
        </Modal>
        <br/>
        {/* {category?.result?.data?.map((e, id)=><Box><Paper sx={{width: 300}} key={id}>{e.name}</Paper><EditIcon onClick={()=>editCategory(e.id, "test")}/><DeleteIcon onClick={()=>deleteCategory(e.id)}/><br/></Box>)} */}
      <PageIndex count={total} page={param} setPage={setParam}/>
      <FormControl sx={{position:'absolute', left: '61%'}}>
        <InputLabel  id="pageSize">Rows per page</InputLabel>
          <Select
            sx={{width: 200, height: 50, display: 'inline-block'}}
            defaultValue=""
            labelId="pageSize"
            id="pageSize"
            value={param.pageSize}
            label="Rows per page"
            onChange={(e)=>handleChange(e)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </Box>
  )
}

export default Category