import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { axiosInstance } from "../../utils";

interface ProductState {
    product: ProductType,
    loaded: boolean,
    error: null
}

type ProductType = {
    id: number,
    images: any[],
    name: string,
    description: string,
    category_id: number,
    price: number
}

const initialState = {
    product: {},
    loaded: false,
    error: null,
} as ProductState

export const getProduct = createAsyncThunk('getProduct', async(productId: number) => {
    let response = await axiosInstance.get(`/products/${productId}`)
    return response.data
})

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProduct.pending, (state) => {

        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.product = action.payload[0]
            state.loaded = true
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const selectProduct = (state: RootState) => state.product

export default productSlice.reducer