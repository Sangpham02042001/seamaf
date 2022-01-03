import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { axiosAuth } from "../../../utils";

const initialState = {
    products: <any>[],
    loaded: false
}

export const getProducts = createAsyncThunk('getProducts', async () => {
    let response = await axiosAuth.get('/products')
    if (response.status == 200) {
        return response.data
    }
})

export const adminProductsSlice = createSlice({
    name: 'AdminUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {

        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            let users = action.payload
            state.products = users
            state.loaded = true
        });
        builder.addCase(getProducts.rejected, (state) => {
            state.loaded  = true
        })
    }
})

export const selectAdminProducts = (state: RootState) => state.adminProducts.products

export default adminProductsSlice.reducer