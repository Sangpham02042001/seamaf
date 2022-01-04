import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";
import { axiosInstance, axiosAuth } from '../../utils'

interface CategoriesState {
    categories: any[],   
    loaded: boolean,
    error: null
}

type CategoryType = {
    id?: number,
    name: string
}

const initialState = {
    categories: [],
    loaded: false,
    error: null
} as CategoriesState

export const getCategories = createAsyncThunk('getCategories',  async () => {
    let response = await axiosInstance.get('/categories')
    return response.data
})

export const createCategory = createAsyncThunk('createCategory', async (name: string, {rejectWithValue}) => {
    try {
        let response = await axiosAuth.post('/categories', {name})
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.error)
        }
        return rejectWithValue(error)
    }
})

export const updateCategory = createAsyncThunk('udpateCategory', async (category: CategoryType, {rejectWithValue}) => {
    try {
        let response = await axiosAuth.put(`/categories/${category.id}`, {name: category.name})
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.error)
        }
        return rejectWithValue(error)
    }
})

export const deleteCategory = createAsyncThunk('deleteCategory', async (categoryId: number, {rejectWithValue}) => {
    try {
        await axiosAuth.delete(`/categories/${categoryId}`)
        return categoryId
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data.error)
        }
        return rejectWithValue(error)
    }
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
        });
        builder.addCase(createCategory.pending, (state) => {

        });
        builder.addCase(createCategory.fulfilled, (state, action) => {
            let category = action.payload
            state.categories.push(category)
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(updateCategory.pending, (state) => {

        });
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            let category = action.payload
            let idx = state.categories.findIndex((c: any) => c.id == category.id);
            if (idx >= 0) {
                state.categories.splice(idx, 1, category)
            }
        });
        builder.addCase(updateCategory.rejected, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(deleteCategory.pending, (state) => {

        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            let categoryId = action.payload
            let idx = state.categories.findIndex((c: any) => c.id == categoryId)
            if (idx >= 0) {
                state.categories.splice(idx, 1)
            }
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const selectCategories = (state: RootState) => state.category.categories;

export default categorySlice.reducer