import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryList: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action)=>{
      state.categoryList.push(action.payload)
    },
    defaultCategory: (state, action)=>{
      state.categoryList = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addCategory, defaultCategory, increase } = categorySlice.actions

export default categorySlice.reducer