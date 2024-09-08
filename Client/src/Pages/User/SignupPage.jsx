
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock, CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Default_Profile from '../../assets/Images/Default_Profile.webp';
import HomeLayout from "../../Layouts/HomeLayout";
import { createAccount } from "../../Redux/AuthSlice";


const SignupPage = ({ isActive }) => {

    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({ fullName: "", email: "", password: "", avatar: Default_Profile })

    const [previewImage, setPreviewImage] = useState(Default_Profile)

    const handleFileUpload = (e) => {
        const uploadedImage = e.target.files[0]

        if (uploadedImage) {
            setUserDetails({
                ...userDetails,
                avatar: uploadedImage
            })

            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)

            fileReader.addEventListener('load', () => {
                setPreviewImage(fileReader.result)
            })
        }
    }


    const handleChange = (e) => {
        const { name, value } = e.target

        setUserDetails({
            ...userDetails,
            [name]: value
        })
    }

    const handleGoogleSignup = (e) => {
        e.preventDefault()
        window.open('https://localhost:4050/auth/google/callback', '_self')
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
            Navigate('/login')
        }

        setUserDetails({ fullName: "", email: "", password: "", avatar: Default_Profile })
        setPreviewImage(Default_Profile)
    }


    return (

        <HomeLayout>
            <div className={` inset-0 flex items-center justify-center bg-[#bcc7d6]  pt-16 text-xl md:top-[10vh] md:pb-24 md:pt-0 `}>
                <div className="flex w-screen items-center justify-around  md:h-screen md:w-3/4 md:items-end lg:w-1/2">

                    <div className=' flex h-[85vh] w-full flex-col items-center justify-evenly border-2 bg-white md:mb-5 md:w-8/12  md:scale-95   md:rounded-2xl md:pb-5 md:shadow-2xl'>

                        <div className='flex items-center justify-center py-3 text-3xl font-bold'><h1>Sign Up</h1>
                        </div>

                        <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center justify-center'>
                            {/* <div>
                                <label htmlFor="avatar" >
                                    <div className=" h-36 w-36 cursor-pointer rounded-full">
                                        {
                                            previewImage ? <img src={previewImage} alt="profile picture" className="h-36 w-36 cursor-pointer rounded-full" /> :
                                                <img src={Default_Profile} alt="profile picture" />
                                        }
                                    </div>
                                </label>
                                <input
                                    onChange={handleFileUpload}
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    accept=".jpg, .jpeg, .svg, .png"
                                    className="hidden" />
                            </div> */}

                            <div className="my-2 w-full">
                                <p className="py-1 text-lg">Full Name</p>

                                <label htmlFor="fullName" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <CiUser />

                                        <input
                                            onChange={handleChange}
                                            type="fullName"
                                            name="fullName"
                                            value={userDetails.fullName}
                                            id="fullName"
                                            placeholder='Enter Your Name'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>

                            </div>

                            <div className="my-2 w-full">

                                <p className="py-1 text-lg">Email</p>

                                <label htmlFor="userEmail" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <AiOutlineMail className="text-slate-500" />

                                        <input
                                            onChange={handleChange}
                                            type="email"
                                            name="email"
                                            value={userDetails.email}
                                            id="userEmail"
                                            placeholder='Enter Your Email'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>

                            <div className="my-2 w-full">
                                <p className="py-1 text-lg">Password</p>
                                <label htmlFor="userPassword" className='flex flex-col'>
                                    <div className="flex  items-center gap-4 ">
                                        <CiLock />

                                        <input
                                            onChange={handleChange}
                                            type="password"
                                            name="password"
                                            value={userDetails.password}
                                            id="userPassword"
                                            placeholder='Enter Your Password'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>

                            <div className="mt-8 w-full">
                                <button type="submit" className="btn  flex   w-full cursor-pointer items-center justify-center  bg-[#563fd7] text-xl text-white hover:bg-[#543ae8]"><p>Sign Up</p></button>
                            </div>
                        </form>

                        <div className="my-3 flex w-3/4 flex-col items-center justify-around">
                            <p className="mb-2 text-lg ">Or</p>

                            <button onClick={handleGoogleSignup} className="border-1 btn  flex  w-full items-center border bg-white shadow-lg hover:bg-inherit"><FcGoogle size={32} /> <p>Signup with <span className="font-bold">google</span></p></button>
                        </div>

                        <div className="mt-1 flex items-center justify-center gap-2">
                            <p className="text-lg">Already have an account?</p>
                            <p className="text-lg text-blue-600"><Link to={'/login'}>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default SignupPage