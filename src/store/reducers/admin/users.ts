import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { axiosAuth } from "../../../utils";

const initialState = {
    users: [] as any, 
    loaded: false,
    error: ''
}

type UserSignUpInterface = {
    name: string,
    email: string,
    password: string,
    role: string
}

export const getUsers = createAsyncThunk('getUsers', async () => {
    let response = await axiosAuth.get('/users')
    if (response.status == 200) {
        return response.data
    }
})

export const createUser = createAsyncThunk('createUser', async (user: UserSignUpInterface, {rejectWithValue}) => {
    try {
        let {name, email, password, role} = user
        let response = await axiosAuth.post('/signup', {
            name, email, password, role
        })
        return response.data.user
    } catch (error: any) {
        if (error.response && error.response.data) {
            let key = Object.keys(error.response.data)[0]
            return rejectWithValue(error.response.data[key][0])
        } else {
            return rejectWithValue(error)
        }
    }
})

export const deleteUser = createAsyncThunk('deleteUser', async (userId: any, {rejectWithValue}) => {
    try {
        let response = await axiosAuth.delete(`/user/${userId}`)
        if (response.status == 200) {
            return userId
        }
    } catch (error: any) {
        if(error.response && error.response.data) {
            let _error = error.response.data.error
            return rejectWithValue(_error)
        } else {
            return rejectWithValue(error)
        }
    }
})

type UpdateUserInterface = {
    userId: number,
    name: string,
    email: string,
    role: string
}

export const updateUser = createAsyncThunk('updateUser', async (userInfo: UpdateUserInterface, {rejectWithValue}) => {
    try {
        let {userId, email, role, name} = userInfo
        let response = await axiosAuth.put(`/user/${userId}`, {
            name, email, role
        })
        if (response.status === 200) {
            return userInfo
        } 
        console.log(userId, email, role, name)
    } catch (error) {
        return rejectWithValue('Something wrong when update')
    }
})

export const adminUsersSlice = createSlice({
    name: 'AdminUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {

        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            let users = action.payload
            state.users = users
            state.loaded = true
        });
        builder.addCase(getUsers.rejected, (state) => {
            state.loaded  = true
        });
        builder.addCase(createUser.pending, (state) => {

        });
        builder.addCase(createUser.fulfilled, (state, action) => {
            let user = action.payload
            state.users.push(user)
            state.error = ''
        });
        builder.addCase(createUser.rejected, (state, action) => {
            let error: any = action.payload
            state.error = error
        });
        builder.addCase(deleteUser.pending, (state) => {

        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            let userId = action.payload
            let idx = state.users.findIndex((u: any) => u.id == userId)
            if (idx >= 0) {
                state.users.splice(idx, 1)
            }
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(updateUser.pending, (state) => {

        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            let userInfo: any = action.payload
            let {userId, name, email, role } = userInfo
            let idx = state.users.findIndex((u: any) => u.id == userId)
            if (idx >= 0) {
                state.users.splice(idx, 1, {
                    ...state.users[idx],
                    name, email, role
                })
            }
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            console.log(action.payload)
        })
    }
})

export const selectAdminUsers = (state: RootState) => state.adminUsers.users

export default adminUsersSlice.reducer