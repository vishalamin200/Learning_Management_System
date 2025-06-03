import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { AiOutlineDiscord } from "react-icons/ai";
import { CiLinkedin, CiYoutube } from "react-icons/ci";
import { RiTelegramLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import FormInput from "../Components/FormInput";
import HomeLayout from "../Layouts/HomeLayout";
import { clearUserMessage, sendUserMessage, setCaptchaToken, updateMessageField } from "../Redux/PageSlice";



const ContactPage = () => {
    const { userMessage } = useSelector((state) => state.Pages)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(updateMessageField({ name, value }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        console.log(userMessage)

        for (const [key, value] of Object.entries(userMessage)) {
            if (!value?.trim() && key != 'captchaToken') {
                toast.error(`${key} is required!`)
                return
            }
        }

        if (!userMessage.captchaToken?.trim()) {
            toast.error('CAPTCHA verification is required!')
            return
        }

        // validate email, phone
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        const phoneRegex = /^[6-9]\d{9}$/;

        if (!emailRegex.test(userMessage.email)) {
            toast.error("please enter valid email")
            return
        }

        if (!phoneRegex.test(userMessage.phone)) {
            toast.error("Provide Valid 10 digit Indian Phone Number")
            return
        }

        await dispatch(sendUserMessage(userMessage))

        dispatch(clearUserMessage())
    }

    return (
        <HomeLayout>
            <div className={`flex w-[100%] flex-col items-center justify-center  bg-[#edeff0] pt-16 text-black shadow-md md:flex md:h-screen md:flex-row md:pt-20 `} >

                {/* bg-[#181A1B] */}
                {console.log(userMessage)}

                <div className="flex w-full flex-col justify-center self-center  border-2 bg-white p-6 text-black md:h-[80%]  md:w-[50vw] md:p-10">
                    <div className="pb-5 pt-3">
                        <p className="text-3xl font-semibold text-black ">Send us a message</p>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="flex flex-wrap md:justify-between">

                            <FormInput
                                onChange={handleChange}
                                field='Name'
                                name='name'
                                value={userMessage?.name}
                            />

                            <FormInput
                                onChange={handleChange}
                                field="Email"
                                name='email'
                                value={userMessage?.email}
                            />

                            <FormInput
                                onChange={handleChange}
                                field="Phone Number"
                                name='phone'
                                value={userMessage?.phone}
                            />

                            <FormInput
                                onChange={handleChange}
                                field="Subject"
                                name='subject'
                                value={userMessage?.subject}
                            />


                            <div className="mt-2 w-full md:w-full">
                                <p>Message<span className="text-red-500">*</span></p>

                                <label htmlFor="message">
                                    <textarea
                                        onChange={handleChange}
                                        name="message"
                                        value={userMessage?.message}
                                        id="message"
                                        className="my-2 h-24 w-[96%] resize-none overflow-hidden rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none md:h-8 md:w-[100%]"
                                    />
                                </label>
                            </div>

                            <div className="relative mt-8 flex w-full items-center justify-between">

                                <div className="h-16 w-64 bg-slate-100 text-black">

                                    <ReCAPTCHA
                                        className="origin-top-left scale-[0.92]"
                                        sitekey="6Ld6MFQrAAAAAPkEacK9qRrak0qQZNEBela-KtS0"
                                        onChange={(token) => dispatch(setCaptchaToken(token))}
                                    />

                                </div>

                                <div className="">
                                    <label htmlFor="submit" className="flex h-12 w-24 cursor-pointer items-center justify-center rounded-xl border border-[#10162F] bg-inherit
                                text-black transition-all duration-300 ease-in-out hover:bg-[#10162F] hover:text-white ">Submit</label>
                                    <button type="submit" id="submit" className="hidden"></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* bg-[#323F90]  */}
                <div className=" relative flex h-96 w-full flex-col  items-center justify-center bg-[#10162F] p-10 text-white md:mt-0  md:h-[80%] md:w-[30vw]">
                    <p className="absolute left-10 top-10 text-3xl font-bold text-white ">Contact Information</p>
                    <p className="text-xl">contact@vishalamin.site</p>

                    <div className=" absolute bottom-10 left-10 flex gap-5">
                        <a href="https://youtube.com/@codeacademy-m6v?si=mUqiJs_aNi3P-aSm" target="_blank">
                            <CiYoutube size={32} />
                        </a>
                        <a href="https://youtube.com/@codeacademy-m6v?si=mUqiJs_aNi3P-aSm" target="_blank">
                            <CiLinkedin size={32} />
                        </a>
                        <a href="https://youtube.com/@codeacademy-m6v?si=mUqiJs_aNi3P-aSm" target="_blank">
                            <RiTelegramLine size={32} />
                        </a>
                        <a href="https://youtube.com/@codeacademy-m6v?si=mUqiJs_aNi3P-aSm" target="_blank">
                            <AiOutlineDiscord size={32} />
                        </a>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ContactPage