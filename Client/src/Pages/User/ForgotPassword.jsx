import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch } from "react-redux";

import HomeLayout from "../../Layouts/HomeLayout";
import { forgotPassword } from "../../Redux/AuthSlice";

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
        <div className="flex items-center justify-center bg-[#EAF3FF] pt-12 text-xl  md:pt-0">
            <div className="flex w-screen items-center justify-around md:h-screen md:w-3/4 lg:w-1/2">

                <div className=' flex h-[90vh] w-full flex-col items-center border-2 bg-white pt-40 shadow-2xl md:h-[50vh]  md:w-8/12 md:justify-around md:rounded-2xl md:pt-0'>


                    <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center '>

                        <div className=' pb-16 pt-2 text-3xl font-bold'><h1>Forgot Password</h1>
                        </div>

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
                                        className='w-10/12 border-none bg-inherit  text-xl outline-none' />
                                </div>
                                <hr className="my-1" />
                            </label>
                        </div>


                        <div className="mt-8 w-full">
                            <button type="submit" className="btn  flex   w-full cursor-pointer items-center justify-center  bg-[#563fd7] text-xl text-white hover:bg-[#543ae8]"><p>Get Reset Password Email</p></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </HomeLayout>)

}

export default ForgotPassword