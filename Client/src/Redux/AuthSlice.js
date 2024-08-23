import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from '../Helper/AxiosInstance.js';



const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') !== 'undefined' ? JSON.parse(localStorage.getItem('data')) : {}
}


export const createAccount = createAsyncThunk('/auth/singup/', async (formData, thunkApi) => {
    try {
        const response = axiosInstance.post('/register', formData);
        toast.promise(response, {
            loading: "Creating Your Account",
            success: (response) => response?.data?.Message,
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
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
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })

        return (await response).data
    } catch (error) {
        if (error.response) {
            const errorMessage = error?.response?.data?.Message || error.message
            return thunkApi.rejectWithValue(errorMessage)
        }
    }
})

export const getProfile = createAsyncThunk('/auth/getProfile',async (thunkApi)=>{
    try {
        const axiosPromise = await axiosInstance.get('/getProfile')
        axiosPromise.data
    } catch (error) {
        // we get error meaans token is expired or server error
        return thunkApi.rejectWithValue(error.name)
    }
})


export const logout = createAsyncThunk('/auth/logout/', async (thunkApi) => {

    try {
        const res = axiosInstance.get('/logout')
        toast.promise(res, {
            loading: "Logging Out...",
            success: (response) => response?.data?.Message,
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })
        return (await res).data
    } catch (error) {
        const errorMessage = error?.response?.data?.Message
        return thunkApi.rejectWithValue(errorMessage)
    }

})

export const forgotPassword = createAsyncThunk('/auth/forgotPassword/', async (formData, thunkApi) => {
    try {
        const res = axiosInstance.post('/forgetPassword', formData)

        toast.promise(res, {
            loading: "Sending Mail...",
            success: (response) => response?.data?.Message || "Email Is Sent To Reset Your Password",
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })

        return (await res).data
    } catch (error) {
        const errorMessage = error?.response?.data?.Message || "Error Occurred Please Try Again"
        return thunkApi.rejectWithValue(errorMessage)
    }
})

export const resetPassword = createAsyncThunk('/auth/resetPassword/', async (formData, thunkApi) => {
    try {
        const { userId, token } = formData
        const res = axiosInstance.post(`/resetPassword/${userId}/${token}`, formData)

        toast.promise(res, {
            loading: "Reseting Your Password...",
            success: (response) => response?.data?.Message || "Password Reset Successfully",
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })

        return (await res).data
    } catch (error) {
        const errorMessage = error?.response?.data?.Message || "Error Occurred Please Try Again"
        return thunkApi.rejectWithValue(errorMessage)
    }
})

export const changePassword = createAsyncThunk('/auth/changePassword/', async (formData, thunkApi) => {
    try {
        const res = axiosInstance.post('/updatePassword/', formData)

        toast.promise(res, {
            loading: "Changing Your Password...",
            success: (response) => response?.data?.Message || "Password Changed Successfully",
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })

        return (await res).data
    } catch (error) {
        const errorMessage = error?.response?.data?.Message || "Error Occurred Please Try Again"
        return thunkApi.rejectWithValue(errorMessage)
    }
})


export const editProfile = createAsyncThunk('/auth/editProfile/', async (formData, thunkApi) => {
    try {
        const axiosPromise = axiosInstance.patch('/editProfile', formData)

        toast.promise(axiosPromise, {
            loading: "Updating Your Profile...",
            success: (resolvedPromise) => resolvedPromise?.data?.Message || "Profile Updated Successfully",
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })

        return (await axiosPromise).data
    } catch (error) {
        const errorMessage = error?.response?.data?.Message || "Error Occurred In Profile Update, Try Again"
        return thunkApi.rejectWithValue(errorMessage)
    }
})


export const deleteAccount = createAsyncThunk('/auth/deleteAccount/', async (thunkApi) => {
    try {
        const axiosPromise = axiosInstance.delete('/deleteAccount')

        toast.promise(axiosPromise, {
            loading: "Deleting Your Account...",
            success: (resolve) => resolve?.data?.Message || "Account Deleted Successfully",
            error: (error) => {
                if ((error?.code === 'ECONNABORTED')) return "Server Is Down, Please Try Again Later"
                else return error?.response?.data?.Message
            }
        })

        return (await axiosPromise).data
    } catch (error) {
        toast.error(error.message)
        const errorMessage = error?.response?.data?.Message || "Error In Deleting Account, Please Try Later"
        return thunkApi.rejectWithValue(errorMessage)
    }
})


const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.data = {},
                state.isLoggedIn = false,
                state.role = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {

                if (action?.payload?.Data) {
                    localStorage.setItem('data', JSON.stringify(action?.payload?.Data))
                    localStorage.setItem('isLoggedIn', true),
                        localStorage.setItem('role', action?.payload?.Data?.role)

                    state.isLoggedIn = true,
                        state.data = action?.payload?.Data,
                        state.role = action?.payload?.Data?.role
                }

            })

            .addCase(editProfile.fulfilled, (state, action) => {

                if (action?.payload?.Data?.User) {
                    localStorage.setItem('data', JSON.stringify(action?.payload?.Data?.User))
                    localStorage.setItem('isLoggedIn', true),
                        localStorage.setItem('role', action?.payload?.Data?.User?.role)

                    state.isLoggedIn = true,
                        state.data = action?.payload?.Data?.User
                    state.role = action?.payload?.Data?.User.role
                }
            })

            .addCase(deleteAccount.fulfilled, (state) => {
                localStorage.clear()
                state.isLoggedIn = false
            })

            .addCase(getProfile.rejected,(state,action)=>{
                if(action?.payload?.Error === "TokenExpiredError")
                localStorage.clear()
                state.isLoggedIn = false
            })
            .addCase(getProfile.fulfilled,(state,action)=>{
                const User = action?.payload?.Data
                if(User && User?.role){
                    state.data = User
                    state.role = User.role
                    state.isLoggedIn = true
                }
            })
    }
})

export const { logoutUser } = AuthSlice.actions
// export const {} = AuthSlice.actions
export default AuthSlice.reducer
