import axios from "axios";


const AxiosInstance = axios.create({

    baseURL: `https://codeacademy.root.sx:4050/user`,
    // baseURL: `https://localhost:4050/user`,

    withCredentials: true,
    timeout: 60000,
})


AxiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error?.response && error?.response?.status === 401) {

            setTimeout(() => {
                localStorage.clear();
                window.location.href = '/login';
            }, 2500);
        }
        if (error?.response?.Error === 'invalid signature') {
            setTimeout(() => {
                localStorage.clear();
                window.location.href = '/login';
            }, 2500);
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance