import axios from "axios";
import toast from "react-hot-toast";


const AxiosInstance = axios.create({

    // baseURL: `https://192.168.1.100:4050/user/auth`,
    baseURL: "https://localhost:4050/user/auth/",     //server default url

    withCredentials: true,
    headers: {
        //Authorization : auth tokens 
    },
    timeout: 12000,
})


AxiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response && error?.response?.status === 401) {

                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/login';
                }, 3000);
                toast.error("Unauthorized Access");
            
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance