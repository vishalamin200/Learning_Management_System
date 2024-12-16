import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../Helper/AxiosInstance";

const initialState = {
    students: [],
    instructors: [],
    yearlyTotal:0,
    totalAmountsByMonth:{},
    paymentsByMonth:{},
    
    userStatus : 'enrolled',
    selectedUserId : null,
    selectedSubscriptions : {},
    selectedCourses:{},
    viewProfile: null,
    deleteUser:null
}

export const fetchStudentsAndInstructors = createAsyncThunk('user/fetchStudentsAndInstructors', async (_, thunkApi) => {
    try {
        const response = await AxiosInstance.get('/auth/fetchStudentsAndInstructors')
        return response.data

    } catch (error) {
        toast.error('Error In Fetching Students And Instructors')
        return thunkApi.rejectWithValue(error.message)
    }
})


export const fetchAllPayments = createAsyncThunk('payment/fetchAllPayments', async (data, thunkApi) => {
    try {
        const response = await AxiosInstance.post('payment/fetchAllPayments',data)
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.Message)
        return thunkApi.rejectWithValue(error.message)
    }
})

export const deleteUserOrInstructor = createAsyncThunk('/dashboard/deleteUserOrInstructor',async (data,thunkApi)=>{

    try {
        const response = AxiosInstance.post('auth/deleteUserOrInstructor',data)
        toast.promise(response,{
            loading:'Deleting User Account...',
            success:(res)=>res?.data?.Message,
            error:(err)=>err?.response?.data?.Message
        })

        return (await response).data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


const StatisticSlice = createSlice({
    name: 'Statistics',
    initialState,
    reducers: {
        setUserStatus : (state,action)=>{
            state.userStatus = action.payload
        },

        setSelectedUserId: (state,action)=>{
            state.selectedUserId = action.payload
        },

        setSelectedSubscriptions: (state,action)=>{
            const {userId,selectedSubscription} = action.payload
            state.selectedSubscriptions[userId] = selectedSubscription
        },

        setSelectedCourses: (state,action)=>{
            const {userId,selectedCourse} = action.payload
            state.selectedCourses[userId] = selectedCourse
        },

        setViewProfile: (state,action)=>{
            state.viewProfile = action.payload
        },

        setDeleteUser: (state,action)=>{
            state.deleteUser = action.payload
        },
        toggleViewProfile: (state,action)=>{
            state.viewProfile ? state.viewProfile = null : state.viewProfile = action.payload 
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentsAndInstructors.fulfilled, (state, action) => {
                const students = action?.payload?.Data?.students
                const instructors = action?.payload?.Data?.instructors
                    
                state.students = students
                state.instructors = instructors
            })
            .addCase(fetchAllPayments.fulfilled, (state, action) => {
                const {paymentsByMonth,totalAmountsByMonth,yearlyTotal} = action.payload.Data
                state.paymentsByMonth = paymentsByMonth
                state.totalAmountsByMonth = totalAmountsByMonth
                state.yearlyTotal = yearlyTotal
            })
    }
})   

export const {setUserStatus,setSelectedUserId, setSelectedSubscriptions, setSelectedCourses,setViewProfile, setDeleteUser,toggleViewProfile} = StatisticSlice.actions

export default StatisticSlice.reducer