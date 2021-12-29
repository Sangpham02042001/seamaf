import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { axiosInstance } from '../../utils'

interface CategoriesState {
    categories: [],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',   
    loaded: false | true,
    error: null
}

const initialState = {
    categories: [],
    loading: 'idle',
    error: null
} as CategoriesState

export const getCategories = createAsyncThunk('getCategories',  async () => {
    let response = await axiosInstance.get('/categories')
    return response.data
})

export const categorySlice =  createSlice({
    name: 'Category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
        });
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
            state.loaded = true
        });
        builder.addCase(getCategories.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer