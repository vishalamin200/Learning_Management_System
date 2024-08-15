import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from '../Helper/AxiosInstance.js';


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {}
}

export const createAccount = createAsyncThunk('/auth/singup/', async (formData, thunkApi) => {
    try {
        const response = axiosInstance.post('/register', formData);
        toast.promise(response, {
            loading: "Creating Your Account",
            success: (response) => response?.data?.Message,
            error: (error) => error?.response?.data?.Message
        })
        return (await response).data
    } catch (e) {
        const errorMessage = e?.response?.data?.Message || e.message
        return thunkApi.rejectWithValue(errorMessage)
    }
})


export const login = createAsyncThunk('/auth/login/', async (formData, thunkApi) => {
    try {
        const response = axiosInstance.post('/login', formData)

        toast.promise(response, {
            loading: "Verifying Credentials...",
            success: (response) => response?.data?.Message,
            error: (error) => error?.response?.data?.Message
        })

        return (await response).data
    } catch (error) {
        const errorMessage = error?.response?.data?.Message || error.message
        return thunkApi.rejectWithValue(errorMessage)
    }
})


export const logout = createAsyncThunk('/auth/logout/', async (thunkApi)=>{

    try {
        const res = axiosInstance.get('/logout')
        toast.promise(res,{
            loading:"Logging Out...",
            success: (response)=> response?.data?.Message,
            error: (e)=> e?.response?.data?.Message
        })
        return (await res).data
    } catch (error) {
        const errorMessage = error?.res?.data?.Message
        return thunkApi.rejectWithValue(errorMessage) 
    }

})



const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logoutUser : (state)=>{
            state.data = {},
            state.isLoggedIn = false,
            state.role = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('data',JSON.stringify(action?.payload?.Data))
                localStorage.setItem('isLoggedIn', true),
                localStorage.setItem('role', action?.payload?.Data?.role)

                state.isLoggedIn = true,
                state.data = action?.payload?.Data,
                state.role = action?.payload?.Data?.role
            })
    }
})

export const {logoutUser} = AuthSlice.actions
// export const {} = AuthSlice.actions
export default AuthSlice.reducer
