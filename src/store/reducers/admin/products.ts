import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { axiosAuth } from "../../../utils";

const initialState = {
    products: <any>[],
    loaded: false
}

type NewProductInterface = {
    name: string,
    description: string,
    price: number,
    category_id: number,
    is_top: number,
    on_sale: number,
    images: [],
    id?: number
}

export const getProducts = createAsyncThunk('getProducts', async () => {
    let response = await axiosAuth.get('/products')
    if (response.status == 200) {
        return response.data
    }
})

export const createProduct = createAsyncThunk('createProduct', async (product: NewProductInterface, {rejectWithValue}) => {
    try {
        let response = await axiosAuth.post('/products', product)
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct', async (productId: any, {rejectWithValue}) => {
    try {
        let response = await axiosAuth.delete(`/products/${productId}`)
        if (response.status === 200) {
            return productId
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.error)
        }
        return rejectWithValue(error)
    }
})

export const updateProduct = createAsyncThunk('updateProduct', async (product: NewProductInterface, {rejectWithValue}) => {
    try {
        let response = await axiosAuth.put(`/products/${product.id}`, product)
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.error)
        }
        return rejectWithValue(error)
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
        });
        builder.addCase(createProduct.pending, (state) => {

        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.products.push(action.payload)
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(deleteProduct.pending, (state) => {

        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            let productId = action.payload
            let idx = state.products.findIndex((p: any) => p.id == productId)
            if (idx >= 0) {
                state.products.splice(idx, 1)
            }
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(updateProduct.pending, (state) => {

        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            let product = action.payload
            let idx = state.products.findIndex((p: any) => p.id == product.id)
            if (idx >= 0) {
                state.products.splice(idx, 1, product);
            }
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const selectAdminProducts = (state: RootState) => state.adminProducts.products

export default adminProductsSlice.reducer