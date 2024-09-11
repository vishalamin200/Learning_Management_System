import axios from "axios";


const AxiosInstance = axios.create({


    // baseURL: `https://192.168.1.101:4050/user`,
    baseURL: "https://localhost:4050/user",     //server default url

    withCredentials: true,
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
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance