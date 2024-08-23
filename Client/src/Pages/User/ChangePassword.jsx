import { useState } from "react";
import toast from "react-hot-toast";
import { CiLock } from "react-icons/ci";
import { useDispatch } from "react-redux";

import HomeLayout from "../../Layouts/HomeLayout";
import { changePassword } from "../../Redux/AuthSlice";

const ChangePassword = () => {

    const [userInfo, setUserInfo] = useState({ currPassword: "", newPassword: "" })
    const dispatch = useDispatch()


    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { newPassword } = e.target

        if (newPassword.value.length < 6) {
            toast.error("New Password Must Be Atleast 6 Character Long")
            return
        }

        const promise = await dispatch(changePassword(userInfo))

        if (promise?.payload?.Message) {
            setUserInfo({ currPassword: "", newPassword: "" })
        }
    }


    return (<HomeLayout>
        <div className="flex items-center justify-center bg-[#bcc7d6] text-xl">
            <div className="flex h-screen w-screen items-center justify-around md:w-3/4 lg:w-1/2">

                <div className=' flex h-[50vh] w-10/12 flex-col items-center justify-around rounded-2xl border-2  bg-white shadow-xl  md:h-[50vh] md:w-8/12'>

                    <div className='flex items-center justify-center pt-3 text-3xl font-bold'><h1>
                        Change Password</h1>
                    </div>

                    <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center justify-center'>
                        <div className="my-2 w-full">
                            <p className="py-1 text-lg">Current Password</p>
                            <label htmlFor="currPassword" className='flex flex-col'>
                                <div className="flex  items-center gap-4 ">
                                    <CiLock />

                                    <input
                                        onChange={handleInputChange}
                                        type="password"
                                        name="currPassword"
                                        value={userInfo.currPassword}
                                        id="currPassword"
                                        placeholder='Enter Current Password'
                                        className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                </div>
                                <hr className="my-1" />
                            </label>
                        </div>
                        <div className="mb-2 mt-3 w-full">
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
                            <button type="submit" className="flex h-9 w-full cursor-pointer items-center justify-center rounded-3xl bg-red-800 bg-gradient-to-r from-[#65D0DF] to-[#9346db] text-xl text-white"><p> Change Password</p></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </HomeLayout>)

}

export default ChangePassword