import { useState } from "react"
import toast from "react-hot-toast"
import { BiHide, BiShow } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import loginPageVideo from "../../assets/Videos/login-page-video.mp4"
import { resetPassword } from "../../Redux/AuthSlice"


const ResetPassword = () => {

    const { userId, token } = useParams()

    const [newPassword, setNewPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (newPassword.trim()?.length < 6) {
            toast.error("Password Must Be Atleast 6 Character Long")
            return
        }

        const promise = await dispatch(resetPassword({ newPassword, userId, token }))

        if (promise?.payload?.Message) {
            setNewPassword("")
            navigate('/login')
        }
    }
    return (
        <div className='flex h-screen w-full'>

            <div className=" hidden h-full w-3/12 bg-[#FFFFFF]  lg:block">
                <video src={loginPageVideo} muted playsInline autoPlay loop
                    controls={false} className='pointer-events-none h-full w-full object-cover '>
                </video>
            </div>

            <div className="mx-10 my-auto  flex w-full flex-col gap-y-12  md:mx-auto md:w-1/2 md:self-center lg:ml-56 lg:w-[26rem] ">

                <h1 className="text-[24px] font-bold">Reset Your Password</h1>


                <form onSubmit={handleSubmit} className='flex w-full flex-col gap-y-4'>

                    <div className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                        <p className="font-bold">New Password</p>

                        <div className="relative flex h-14">
                            <input
                                type={showPassword ? "text" : 'password'}
                                name='newPassword'
                                value={newPassword}
                                placeholder="5+ characters"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className='h-full w-full rounded-lg border border-gray-400 pl-4 pr-14 text-black transition-all  duration-300 hover:shadow-md focus:outline-none'
                            />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute right-4 flex h-full cursor-pointer items-center">
                                {showPassword ? <BiShow size={22} /> : <BiHide size={22} />}
                            </div>

                        </div>

                    </div>

                    <button type='submit' className=" mt-4 flex h-12 w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border bg-[#191919]  text-white transition-transform duration-300 ease-in-out active:scale-95 lg:h-11 lg:w-56">
                        <span className="select-none text-sm font-bold">Reset Password</span>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default ResetPassword
