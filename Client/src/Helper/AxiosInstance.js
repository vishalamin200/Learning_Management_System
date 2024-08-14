import axios from "axios";


const instance = axios.create({
    baseURL:"http://192.168.1.100:4050/api/auth",     //server default url
    headers:{
        //Authorization : auth tokens 
        // "Content-Type":'application/json',
    },
    timeout:10000,
    withCredentials:true
})

export default instance