import axios from "axios";


const AxiosInstance= axios.create({
    baseURL:"https://192.168.1.102:4050/api/auth",     //server default url
    withCredentials:true,
    headers:{
        //Authorization : auth tokens 
        // "Content-Type":'application/json',
    },
    timeout:5000,
})

export default AxiosInstance