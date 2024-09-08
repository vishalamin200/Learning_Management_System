import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { login } from "../../Redux/AuthSlice";

const LoginPage = ({ isActive }) => {
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

    const handleGoogleLogin = (e) => {
        e.preventDefault()
        window.open('https://localhost:4050/auth/google/callback', '_self')
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
            <div className={` inset-0 flex items-center justify-center  bg-[#bcc7d6] pt-16 text-xl md:pb-20 md:pt-0`} >
                <div className="flex h-fit w-screen justify-around md:h-screen md:w-3/4 md:items-end lg:w-1/2">

                    <div className=' flex h-[85vh] w-full flex-col items-center justify-evenly border-2 bg-white shadow-2xl  transition-all  duration-500 ease-in-out md:mb-5 md:h-[85vh] md:w-8/12 md:scale-95 md:justify-around md:rounded-2xl'>

                        <div className=' text-3xl font-bold md:py-3 md:pt-3'><h1>Login</h1>
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
                                <p className="absolute right-0 my-3 text-lg"><Link to='/forgotPassword'> Forgot Password?</Link> </p>
                            </div>
                            <div className="mt-16 w-full">
                                <button type="submit" className="btn  flex   w-full cursor-pointer items-center justify-center  bg-[#563fd7] text-xl text-white hover:bg-[#543ae8]"><p>Login</p></button>
                            </div>
                        </form>
                        <div className="mb-6 flex w-3/4 flex-col items-center  justify-around">
                            <p className="mb-2 text-lg ">Or</p>

                            <button onClick={handleGoogleLogin} className="border-1 btn  flex  w-full items-center border bg-white shadow-lg hover:bg-inherit"><FcGoogle size={32} /> <p>Login with <span className="font-bold">google</span></p></button>
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

export default LoginPage