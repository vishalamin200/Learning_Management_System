import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import AxiosInstance from "../Helper/AxiosInstance";

const initialState = {
    userMessage: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        captchaToken: ""
    },
}

export const sendUserMessage = createAsyncThunk('userMessage', async (formData, thunkApi) => {
    try {
        const res = AxiosInstance.post('/contact/sendUsMessage', formData)

        toast.promise(res, {
            loading: "Sending your message...",
            success: (response) => response.data.Message || "We received your message",
            error: (err) => err.response.data.Message || "Error in sending your message"
        })

        return (await res).data

    } catch (error) {
        const errorMessage = error?.response?.data?.Message
        return thunkApi.rejectWithValue(errorMessage)
    }
})

const PageSlice = createSlice({
    name: 'Page-Slice',
    initialState,
    reducers: {
        updateMessageField: (state, action) => {
            const { name, value } = action.payload
            state.userMessage[name] = value
        },

        setCaptchaToken: (state, action) => {
            state.userMessage['captchaToken'] = action.payload
        },
        clearUserMessage: (state) =>{
            state.userMessage = {
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            }
        },
    },

})

export const { updateMessageField, setCaptchaToken, clearUserMessage } = PageSlice.actions
export default PageSlice.reducer