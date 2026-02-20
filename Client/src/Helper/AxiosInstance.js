import axios from "axios";


const AxiosInstance = axios.create({

    // baseURL: `https://codeacademy.root.sx/user`,
    // baseURL: `http://localhost:3000/user`,
    // baseURL: `https://lms-next-backend.vercel.app/user`,
    baseURL: `https://api.codeacademy.vishalamin.site/user`,

    withCredentials: true,
    timeout: 60000,
})


AxiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
    
);

export default AxiosInstance