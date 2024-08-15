import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import FacebookIcon from '../assets/Images/Facebook-icon.svg';
import TwitterIcon from '../assets/Images/Twitter-icon.svg';
import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/AuthSlice";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({ email: "", password: "" })

    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target
        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, password } = e.target

        if (!email.value) {
            toast.error("Email Is Missing")
            return
        }

        if (!password.value) {
            toast.error("Password Is Missing")
            return
        }

        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!email.value.match(emailRegex)) {
            toast.error("Enter Valid Email Address")
            return
        }

        // send data to server
        const promise = await dispatch(login(userInfo))

        if (promise?.payload?.Data) {
            navigate('/')
        }

        setUserInfo({ email: "", password: "" })
    }

    return (
        <HomeLayout>
            <div className="flex items-center justify-center bg-gradient-to-r from-[#65D0DF] to-[#9346db] text-xl">
                <div className="flex h-screen w-screen items-center justify-around md:w-3/4 lg:w-1/2">

                    <div className=' flex h-[80vh] w-10/12 flex-col items-center justify-around rounded-2xl border-2  bg-white  md:h-[85vh] md:w-8/12'>

                        <div className='flex items-center justify-center py-3 text-3xl font-bold'><h1>Login</h1>
                        </div>

                        <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center justify-center'>
                            <div className="my-2 w-full">
                                <p className="py-1 text-lg">Email</p>
                                <label htmlFor="Email" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <AiOutlineMail className="text-slate-500" />

                                        <input
                                            onChange={handleInputChange}
                                            type="email"
                                            name="email"
                                            value={userInfo.email}
                                            id="Email"
                                            placeholder='Enter Your Email'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>

                            <div className="my-2 w-full">
                                <p className="py-1 text-lg">Password</p>
                                <label htmlFor="password" className='flex flex-col'>
                                    <div className="flex  items-center gap-4 ">
                                        <CiLock />

                                        <input
                                            onChange={handleInputChange}
                                            type="password"
                                            name="password"
                                            value={userInfo.password}
                                            id="password"
                                            placeholder='Enter Your Password'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>
                            <div>
                                <p className="absolute right-0 my-3 text-lg">Forgot Password?</p>
                            </div>
                            <div className="mt-16 w-full">
                                <button type="submit" className="flex h-9 w-full cursor-pointer items-center justify-center rounded-3xl bg-red-800 bg-gradient-to-r from-[#65D0DF] to-[#9346db] text-xl text-white"><p>Login</p></button>
                            </div>
                        </form>
                        <div className="mt-4 flex flex-col items-center justify-around">
                            <p className="mb-4 text-lg ">Or Sign Up Using</p>

                            <div className="flex items-center justify-center gap-3">
                                <FcGoogle size={40} />
                                <img src={TwitterIcon} alt='twitter-icon' className="w-12" />
                                <img src={FacebookIcon} alt='twitter-icon' className="w-11" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <p className="text-lg">Don&apos;t have an account?</p>
                            <p className="text-lg text-blue-600"><Link to={'/signup'}>Signup</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default Login