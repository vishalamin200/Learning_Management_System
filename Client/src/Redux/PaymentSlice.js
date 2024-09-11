import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../Helper/AxiosInstance";

const initialState = {
    keyId: "",
    subscriptionId: "",
    orderId: "",
    purchaseHistory: [],
    allPayments : []
}

export const getKeyId = createAsyncThunk('payment/getKeyId', async (_, thunkApi) => {
    try {
        const response = await AxiosInstance.get('payment/getKeyId')
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.Message)
        return thunkApi.rejectWithValue(error.message)
    }
})

export const createOrder = createAsyncThunk('payment/createOrder', async (data, thunkApi) => {
    try {
        const response = await AxiosInstance.post('payment/createOrder', data)
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.Message)
        return thunkApi.rejectWithValue(error.message)
    }
})

export const verifyOrder = createAsyncThunk('payment/verifyOrder', async (data, thunkApi) => {
    try {
        const response = AxiosInstance.post('payment/verifyOrder', data)

        toast.promise(response, {
            loading: 'Payment Is Verifying...',
            success: (response) => response?.data?.Message,
            error: (error) => error?.response?.data?.Message
        })
        return (await response).data
    } catch (error) {
        toast.error("Error In Verifying The Payment, Try Again Later")
        return thunkApi.rejectWithValue(error.message)
    }
})

export const createSubcription = createAsyncThunk('payment/createSubscription', async (data, thunkApi) => {
    try {
        const response = AxiosInstance.post('payment/subscribe', data)
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.Message)
        return thunkApi.rejectWithValue(error.message)
    }
})

export const verifyPayment = createAsyncThunk('payment/verify', async (paymentDetails, thunkApi) => {
    try {
        const response = AxiosInstance.post('payment/verify', paymentDetails)
        toast.promise(response, {
            pending: 'Payment Is Verifying...',
            success: (response) => response?.data?.Message,
            error: (error) => error?.response?.data?.Message
        })
        return (await response).data
    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const fetchPurchaseHistory = createAsyncThunk('payment/purchaseHistory', async (_, thunkApi) => {
    try {
        const response = await AxiosInstance.get('payment/purchaseHistory')
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.Message)
        return thunkApi.rejectWithValue(error.message)
    }
})




const PaymentSlice = createSlice({
    name: 'Payment',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getKeyId.fulfilled, (state, action) => {
                state.keyId = action?.payload?.Data
            })

            .addCase(createSubcription.fulfilled, (state, action) => {
                const subscription = action?.payload?.Data
                if (subscription) {
                    state.subscriptionId = subscription.id
                }
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                const order = action?.payload?.Data
                state.orderId = order?.id
            })

            .addCase(fetchPurchaseHistory.fulfilled, (state, action) => {
                const purchaseHist = action?.payload?.Data
                if (purchaseHist) {
                    state.purchaseHistory = purchaseHist
                }
            })
    }
})


export default PaymentSlice.reducer