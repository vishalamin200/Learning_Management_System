import axios from "axios";


const AxiosInstance= axios.create({

    baseURL:`https://192.168.1.100:4050/api/auth`,     
    // baseURL:"https://localhost:4050/api/auth",     //server default url
    
    withCredentials:true,
    headers:{
        //Authorization : auth tokens 
        // "Content-Type":'application/json',
    },
    timeout:10000,
})

export default AxiosInstance