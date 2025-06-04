import { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"

import { forgotPassword } from "../../Redux/AuthSlice"


const ForgotPassword = () => {

    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (!forgotPasswordEmail?.trim()) {
            toast.error("Email Is Missing")
            return
        }

        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        if (!emailRegex.test(forgotPasswordEmail)) {
            toast.error("Enter Valid Email Address")
            return
        }

        // send data to server
        const promise = await dispatch(forgotPassword({ email: forgotPasswordEmail }))

        if (promise?.payload?.Data) {
            setForgotPasswordEmail("")
        }
    }

    return (
        <div className="mx-10 my-auto flex w-full flex-col gap-y-8 md:mx-auto  md:w-1/2 md:self-center lg:ml-56 lg:w-[26rem] ">

            <h1 className="text-[26px] font-bold">Forgot Password?</h1>

            <div className='flex w-full flex-col gap-y-4 text-sm'>
                <p >Enter the email address you used when you joined and we’ll send you instructions to reset your password.
                </p>
                <p >
                    We will share you a link on your email, by clicking it you can reset your password securely.
                </p>
            </div>

            <form onSubmit={handleSubmit} className='flex w-full flex-col gap-y-4'>

                <div className="flex flex-col gap-y-1 hover:shadow-pink-300 ">
                    <p className="font-bold">Email Address</p>
                    <input
                        type='text'
                        name='email'
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className='h-14 w-full rounded-lg border border-gray-400 pl-4 text-black transition-all  duration-300 hover:shadow-md focus:outline-none'
                    />
                </div>

                <button type='submit' className="mt-4 flex h-12 w-full items-center justify-center gap-x-3 rounded-l-full rounded-r-full border bg-[#191919] text-white  transition-transform duration-300 ease-in-out active:scale-95 lg:h-11 lg:w-56">
                    <span className="text-sm font-bold">Send Reset Intructions</span>
                </button>

            </form>
        </div>

    )
}

export default ForgotPassword
