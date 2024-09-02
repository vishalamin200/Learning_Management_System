import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import CourseAxiosInstance from "../Helper/CourseAxiosInstance"
const initialState = {}

export const fetchCourseByCategory = createAsyncThunk('courses/getCourseByCategory/', async (formData, thunkApi) => {

    try {
        const res = await CourseAxiosInstance.post('/courses', formData)
        return res.data

    } catch (error) {
        toast.error(error.response.data?.Message || "Error In Fetching Courses")
        return thunkApi.rejectWithValue(error)
    }
})

export const fetchAllCourses = createAsyncThunk('courses/getchAllCourses/', async (formData, thunkApi) => {

    try {
        const res = await CourseAxiosInstance.get('/', formData)
        return res.data

    } catch (error) {
        toast.error(error?.response.data?.Message || "Error In Fetching Courses")
        return thunkApi.rejectWithValue(error.message)
    }
})

export const fetchSubscribedCourses = createAsyncThunk('courses/fetchSubscribedCourses/', async (_, thunkApi) => {

    try {
        const res = await CourseAxiosInstance.get('/subscribedCourses')
        return res.data

    } catch (error) {
        toast.error(error?.response.data?.Message || "Error In Fetching Subscribed Courses")
        return thunkApi.rejectWithValue(error.message)
    }
})

export const createCourse = createAsyncThunk('createCourse/', async (formData, thunkApi) => {

    try {
        const res =  CourseAxiosInstance.post('/', formData)

        toast.promise(res,{
            loading:"Creating Your Course...",
            success: (response)=> response?.data?.Message,
            error : (error)=>  error?.response.data?.Message || "Error In Creating Course"
        })
        return (await res).data

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const editCourse = createAsyncThunk('editCourse/', async ({formData,courseId}, thunkApi) => {

    try {
        const res =  CourseAxiosInstance.put(`/${courseId}`, formData)

        toast.promise(res,{
            loading:"Updating Your Course...",
            success: (response)=> response?.data?.Message,
            error : (error)=>  error?.response.data?.Message || "Error In Updating Course"
        })
        return (await res).data

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


export const deleteCourse = createAsyncThunk('deleteCourse/', async (courseId, thunkApi) => {

    try {
        const res =  CourseAxiosInstance.delete(`/${courseId}`)

        toast.promise(res,{
            loading:"Deleting Your Course...",
            success: (response)=> response?.data?.Message,
            error : (error)=>  error?.response.data?.Message || "Error In Delete Your Course"
        })
        return (await res).data

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const addLecture = createAsyncThunk('course/addLecture/', async ({formData,courseId}, thunkApi) => {

    try {
        const res =  CourseAxiosInstance.post(`/${courseId}/`, formData)
        toast.promise(res,{
            loading:"Creating New Lecture...",
            success: (response)=> response?.data?.Message,
            error : (error)=>  error?.response.data?.Message || "Error In Creating Lecture"
        })
        return (await res).data

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})

export const editLecture = createAsyncThunk('course/editLecture/', async ({formData,courseId,lectureId}, thunkApi) => {

    try {
        const res =  CourseAxiosInstance.put(`/${courseId}/${lectureId}`, formData)
        toast.promise(res,{
            loading:"Updating Your Lecture...",
            success: (response)=> response?.data?.Message,
            error : (error)=>  error?.response.data?.Message || "Error In Updating Lecture"
        })
        return (await res).data

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


export const deleteLecture = createAsyncThunk('course/deleteLecture/', async ({courseId,lectureId}, thunkApi) => {

    try {
        const res =  CourseAxiosInstance.delete(`/${courseId}/${lectureId}`)
        toast.promise(res,{
            loading:"Deleting Your Lecture...",
            success: (response)=> response?.data?.Message,
            error : (error)=>  error?.response.data?.Message || "Error In Deleting Lecture"
        })
        return (await res).data

    } catch (error) {
        return thunkApi.rejectWithValue(error.message)
    }
})


const CourseSlice = createSlice({
    name: "Course",
    initialState,
    reducers: {

    }
})


export default CourseSlice.reducer