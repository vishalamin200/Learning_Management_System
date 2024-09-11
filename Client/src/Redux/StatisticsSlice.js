import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../Helper/AxiosInstance";

const initialState = {
    students: [],
    instructors: [],
    yearlyTotal:0,
    totalAmountsByMonth:{},
    paymentsByMonth:{}
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


const StatisticSlice = createSlice({
    name: 'Statistics',
    initialState,
    reducers: {

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

export default StatisticSlice.reducer