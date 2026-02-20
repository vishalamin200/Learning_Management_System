import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../../Redux/AuthSlice"


const LoginPage = () => {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleGoogleLogin = (e) => {
        e.preventDefault();
        window.location.href =
            "https://api.codeacademy.vishalamin.site/api/auth/google";
    };

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

        <div className="mx-10 mt-16 flex w-full flex-col gap-y-8 md:mx-auto md:mt-8 md:w-1/2 md:self-center lg:ml-56 lg:w-[26rem] ">

            <h1 className="text-[24px] font-bold">Sign in to CodeAcademy</h1>

            <button onClick={handleGoogleLogin} id='google-auth-button' className="flex h-14  w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border border-gray-400 transition-transform duration-300 ease-in-out active:scale-95">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="float-left w-5" />
                <span className=" font-bold">Sign in with Google</span>
            </button>

            <div id="line-break" className='flex w-full items-center justify-center gap-x-3'>
                <hr className='w-1/5 md:w-1/4' />
                <span>or sign in with email</span>
                <hr className='w-1/5 md:w-1/4' />
            </div>

            <form onSubmit={handleSubmit} className='flex w-full flex-col gap-y-4'>

                <div id="email" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                    <p className="font-bold">Email</p>
                    <input
                        type='text'
                        name='email'
                        value={userInfo?.email}
                        onChange={handleInputChange}
                        className='h-14 w-full rounded-lg border border-gray-400 pl-4 text-black transition-all  duration-300 hover:shadow-md focus:outline-none'
                    />
                </div>

                <div id="password" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                    <div className='flex justify-between'>
                        <p className="font-bold">Password</p>
                        <Link className='cursor-pointer text-sm text-blue-700 underline' to='/auth/forgotPassword'> Forgot Password?</Link>
                    </div>
                    <input
                        type='password'
                        name='password'
                        value={userInfo?.password}
                        onChange={handleInputChange}
                        className='h-14 w-full rounded-lg border  border-gray-400 pl-4 text-xl transition-all  duration-300 hover:shadow-md focus:outline-none'
                    />
                </div>

                <button type='submit' id='submit-button' className="mt-4 flex h-14 w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border  bg-[#191919] text-white transition-transform duration-300 ease-in-out active:scale-95">
                    <span className="text-sm font-bold">Sign in</span>
                </button>
            </form>

            <p className='text-md text-center'>Don&apos;t have an account? <Link className="text-blue-700 underline" to={'/auth/signup'}>signup</Link></p>

        </div>

    )
}

export default LoginPage