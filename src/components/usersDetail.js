import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function UsersDetail() {
    const apiURL = 'https://vibonus-dev-api.vinova.sg/'
    const [ users, setUsers ] = useState([])
    const [ reqErr, setReqErr ] = useState()
    const param = useParams()
    const id = param?.id

    console.log(id)

    const authAxios = axios.create({
        baseURL: apiURL,
        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })
    const fetchUser = async () => {
        try{
            const result = await authAxios.get(`${apiURL}api/users/${id}`)
            setUsers([...users, result.data.result])
        }
        catch(err){
            setReqErr(err.message)
        }
    }
    useEffect(()=>console.log(users), [users])

    return (
        <div>
            <h1>users Detail</h1>
            
        </div>
    )
}

export default UsersDetail