import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { axiosInstance } from '../../utils';

interface ProductsState {
    products: [],
    error: null,
    loaded: false | true,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
}

const initialState = {
    products: [],
    error: null,
    loading: 'idle'
} as ProductsState

export const getProductsByCategoryId = createAsyncThunk('getProductsByCategoryId', async (categoryId: number) => {
    let response = await axiosInstance.get(`/category/${categoryId}`)
    return response.data
})

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductsByCategoryId.pending, (state) => {
        });
        builder.addCase(getProductsByCategoryId.fulfilled, (state, action) => {
            state.products = action.payload
            state.loaded = true
        });
        builder.addCase(getProductsByCategoryId.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const selectProducts = (state: RootState) => state.product.products;

export default productSlice.reducer