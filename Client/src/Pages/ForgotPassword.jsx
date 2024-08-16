import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";

import HomeLayout from "../Layouts/HomeLayout";
import { forgotPassword } from "../Redux/AuthSlice";

const ForgotPassword = () => {

    const [userInfo, setUserInfo] = useState({ email: "" })
    const dispatch = useDispatch()


    const handleInputChange = (e) => {
        e.preventDefault()

        setUserInfo({ email: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email } = e.target

        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!email.value.match(emailRegex)) {
            toast.error("Enter Valid Email Address")
            return
        }

        const promise = await dispatch(forgotPassword(userInfo))
        console.log("Payload:", promise?.payload)

        if (promise?.payload?.Message) {
            setUserInfo({ email: "" })
        }
    }


    return (<HomeLayout>
        <div className="flex items-center justify-center bg-gradient-to-r from-[#65D0DF] to-[#9346db] text-xl">
            <div className="flex h-screen w-screen items-center justify-around md:w-3/4 lg:w-1/2">

                <div className=' flex h-[40vh] w-10/12 flex-col items-center justify-around rounded-2xl border-2  bg-white  md:h-[50vh] md:w-8/12'>

                    <div className='flex items-center justify-center pt-3 text-3xl font-bold'><h1>Forgot Password</h1>
                    </div>

                    <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center justify-center'>
                        <div className="mb-2 w-full">
                            <p className="py-1 text-lg">Email</p>
                            <label htmlFor="forgotEmail" className='flex flex-col'>
                                <div className="flex  items-center gap-4">
                                    <AiOutlineMail className="text-slate-500" />

                                    <input
                                        onChange={handleInputChange}
                                        type="email"
                                        name="email"
                                        value={userInfo.email}
                                        id="forgotEmail"
                                        placeholder='Enter Your Email'
                                        className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                </div>
                                <hr className="my-1" />
                            </label>
                        </div>


                        <div className="mt-8 w-full">
                            <button type="submit" className="flex h-9 w-full cursor-pointer items-center justify-center rounded-3xl bg-red-800 bg-gradient-to-r from-[#65D0DF] to-[#9346db] text-xl text-white"><p>Get Reset Password Email</p></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </HomeLayout>)

}

export default ForgotPassword