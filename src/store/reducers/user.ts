import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { axiosAuth } from '../../utils'

interface UserInterface {
    user: {
        name: string,
        email: string,
        role: string
    },
    loaded: boolean
}

const initialState = {
    user: {
        name: '',
        email: '',
        role: ''
    },
    loaded: false
} as UserInterface

export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
    let response = await axiosAuth.get('/user-info')
    if (response.status === 200) {
        return response.data
    }
})

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {
                name: '',
                email: '',
                role: ''
            }
            state.loaded = false
            localStorage.removeItem('access_token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.pending, (state) => {

        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            let user = action.payload
            if (user && user.name) {
                state.user = user
            }
            state.loaded = true
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.loaded = true
        })
    }
})

export const selectUser = (state: RootState) => state.user.user

export const {logout} = userSlice.actions

export default userSlice.reducer