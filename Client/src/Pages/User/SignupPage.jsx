import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Default_Profile from '../../assets/Images/Default_Profile.webp';
import SignupPageVideo from "../../assets/Videos/signup-page-video.mp4";
import { createAccount } from "../../Redux/AuthSlice";

const SignupPage = () => {

    const [userDetails, setUserDetails] = useState({ fullName: "", email: "", password: "", avatar: Default_Profile })

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleLogin = (e) => {
        e.preventDefault()
        window.open('https://codeacademy.root.sx:4050/auth/google/callback', '_self')
    }

    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target
        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()

        const { fullName, email, password } = event.target

        const formData = new FormData(event.target)

        //All values are Provided?
        if (!fullName.value) {
            toast.error("Name Is Required")
            return
        }
        if (!email.value) {
            toast.error("Email Is Required")
            return
        }
        if (!password.value) {
            toast.error("Password Is Required")
            return
        }

        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        //Email is Valid?
        if (!email.value.match(emailRegex)) {
            toast.error("Enter Valid Email Address")
            return
        }

        //Password is too short?
        if (password.value.length < 6) {
            toast.error("Password Must Be Atleast 6 Character Long")
            return
        }

        // creating Account
        const response = await dispatch(createAccount(formData))

        if (response?.payload?.Data?.User) {
            navigate('/login')
        }

        setUserDetails({ fullName: "", email: "", password: "", avatar: Default_Profile })
    }

    return (
        <div id='signup-page' className='flex h-screen w-full'>

            <div id='sidebar-video' className=" hidden h-full w-3/12 bg-[#FFFFFF]  lg:block">
                <video src={SignupPageVideo} muted playsInline autoPlay loop
                    controls={false} className='pointer-events-none h-full w-full object-cover '></video>
            </div>

            <button onClick={() => navigate(-1)} className="ml-20  mt-16 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-300 md:flex">
                <IoIosArrowBack size={24} />
            </button>

            <div className="mx-10 mt-12 flex w-full flex-col gap-y-6 md:mx-auto md:ml-24 md:mt-4 md:w-1/2 md:self-center lg:ml-28 lg:w-[26rem] ">

                <div className="flex gap-x-5">

                    <h1 className="text-[24px] font-bold">Sign up to CodeAcademy</h1>
                </div>


                <button onClick={handleGoogleLogin} id='google-auth-button' className="flex h-14  w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border border-gray-400 transition-transform duration-300 ease-in-out active:scale-95">
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="float-left w-5" />
                    <span className=" font-bold">Sign up with Google</span>
                </button>

                <div id="line-break" className='flex w-full items-center justify-center gap-x-3'>
                    <hr className='w-1/5 md:w-1/4' />
                    <span>or sign up with email</span>
                    <hr className='w-1/5 md:w-1/4' />
                </div>

                <form onSubmit={handleSubmit} className='flex w-full flex-col gap-y-3'>

                    <div id="fullName" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                        <p className="font-bold">Name</p>
                        <input
                            type='text'
                            name='fullName'
                            value={userDetails?.fullName}
                            onChange={handleInputChange}
                            className='h-14 w-full rounded-lg border border-gray-400 pl-4 text-black transition-all  duration-300 hover:shadow-md focus:outline-none'
                        />
                    </div>

                    <div id="email" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                        <p className="font-bold">Email</p>
                        <input
                            type='text'
                            name='email'
                            value={userDetails?.email}
                            onChange={handleInputChange}
                            className='h-14 w-full rounded-lg border border-gray-400 pl-4 text-black transition-all  duration-300 hover:shadow-md focus:outline-none'
                        />
                    </div>

                    <div id="password" className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                        <div className='flex justify-between'>
                            <p className="font-bold">Set Password</p>
                        </div>
                        <input
                            type='password'
                            name='password'
                            placeholder="5+ characters"
                            value={userDetails?.password}
                            onChange={handleInputChange}
                            className='text-md h-14 w-full rounded-lg  border border-gray-400 pl-4  transition-all  duration-300 hover:shadow-md focus:outline-none'
                        />
                    </div>

                    <button type='submit' id='submit-button' className="mt-4 flex h-14 w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border border-black bg-black text-white transition-transform duration-300 ease-in-out active:scale-95">
                        <span className="text-sm font-bold">Create Account</span>
                    </button>
                </form>

                <p className='text-md text-center'>Already have an account? <Link className="text-blue-700 underline" to={'/login'}>sign in</Link></p>

            </div>
        </div>
    )
}

export default SignupPage