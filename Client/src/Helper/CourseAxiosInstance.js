import axios from "axios";
import toast from "react-hot-toast";


const CourseAxiosInstance = axios.create({

     baseURL: "https://localhost:4050/user/vi/course/",     //server default url

    withCredentials: true,
    timeout: 12000,
})

CourseAxiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response && error?.response?.status === 401) {

            // Check if the error message indicates token expiration
            if (error?.response?.data?.Error === 'TokenExpiredError') {
                 setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, 3000);
            } else {
                toast.error("Unauthorized Access");
            }
        }
        return Promise.reject(error);
    }
);

export default CourseAxiosInstance
