import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getProfile } from "../../Redux/AuthSlice"


const AuthLoginSuccess = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserDetails = async () => {
            const thunkResponse = await dispatch(getProfile())
            console.log(thunkResponse.payload)
            if (thunkResponse?.payload?.Success) {
                toast.success("LoggedIn Successfully")
                navigate('/')
            }else{
                toast.error('Error In logged In')
                navigate('/login')
            }
        }
        fetchUserDetails()
    }, [])

}

export default AuthLoginSuccess