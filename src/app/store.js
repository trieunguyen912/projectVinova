import { configureStore } from "@reduxjs/toolkit";
import useReducer from '../features/users/usersSlice'

export default configureStore({
    reducer: {
        users: useReducer 
    }
})