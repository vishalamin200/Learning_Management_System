import { useState } from "react";
import toast from "react-hot-toast";
import { CiLock } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { resetPassword } from "../../Redux/AuthSlice";

const ResetPassword = () => {

    const { userId, token } = useParams()
    const [userInfo, setUserInfo] = useState({ newPassword: "", userId, token })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        e.preventDefault()

        setUserInfo({ ...userInfo, newPassword: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { newPassword } = e.target

        if (newPassword.value.length < 6) {
            toast.error("Password Must Be Atleast 6 Character Long")
            return
        }

        const promise = await dispatch(resetPassword(userInfo))

        if (promise?.payload?.Message) {
            setUserInfo({ newPassword: "" })
            navigate('/login')
        }
    }


    return (<HomeLayout>
        <div className="flex items-center justify-center bg-[#bcc7d6]  text-xl">
            <div className="flex h-screen w-screen items-center justify-around md:w-3/4 lg:w-1/2">

                <div className=' flex h-[86vh] w-full flex-col items-center rounded-2xl border-2 bg-white pt-40 shadow-2xl md:h-[50vh]  md:w-8/12  md:justify-around md:pt-0'>



                    <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center justify-center'>
                        <div className='flex items-center justify-center pb-4 pt-3 text-3xl font-bold md:pb-0'><h1>Reset Password</h1>
                        </div>
                        <div className="my-2 w-full">
                            <p className="py-1 text-lg">New Password</p>
                            <label htmlFor="newPassword" className='flex flex-col'>
                                <div className="flex  items-center gap-4 ">
                                    <CiLock />

                                    <input
                                        onChange={handleInputChange}
                                        type="password"
                                        name="newPassword"
                                        value={userInfo.newPassword}
                                        id="newPassword"
                                        placeholder='Enter New Password'
                                        className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                </div>
                                <hr className="my-1" />
                            </label>
                        </div>


                        <div className="mt-8 w-full">
                            <button type="submit" className="btn  flex   w-full cursor-pointer items-center justify-center  bg-[#563fd7] text-xl text-white hover:bg-[#543ae8]"><p>Reset Password</p></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </HomeLayout>)

}

export default ResetPassword