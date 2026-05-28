import axios from "axios";


const AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/user`,
    withCredentials: true,
    timeout: 60000,
})


AxiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
    
);

export default AxiosInstance