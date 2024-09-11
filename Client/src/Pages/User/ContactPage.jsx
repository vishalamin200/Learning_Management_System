import { AiOutlineDiscord } from "react-icons/ai";
import { CiLinkedin, CiYoutube } from "react-icons/ci";
import { RiTelegramLine } from "react-icons/ri";

import FormInput from "../../Components/FormInput";
import HomeLayout from "../../Layouts/HomeLayout";



const ContactPage = () => {
    return (

        <HomeLayout>
            <div className={`flex w-[100%] flex-col items-center justify-center  bg-[#bcc7d6]  pt-16 text-white md:flex md:h-screen md:flex-row md:pt-20 `} >

                {/* bg-[#181A1B] */}


                <div className="flex w-full flex-col justify-center self-center  border-2 bg-white p-6 text-black md:h-[80%]  md:w-[50vw] md:p-10">
                    <div className="pb-5 pt-3">
                        <p className="text-3xl font-semibold text-black ">Send us a message</p>
                    </div>
                    <form action="">
                        <div className="flex flex-wrap md:justify-between">

                            <FormInput field='Name' name='name' value={""} />
                            <FormInput field="Email" name='email' value={""} />
                            <FormInput field="Phone Number" name='contact' value={""} />
                            <FormInput field="Subject" name='subject' value={""} />


                            <div className="mt-2 w-full md:w-full">
                                <p>Message<span className="text-red-500">*</span></p>
                                <label htmlFor="message">
                                    <textarea name="message" id="message" className="my-2 
                            h-24 w-[96%] resize-none overflow-hidden rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none md:h-8 md:w-[100%]" />
                                </label>
                            </div>
                            <div className="relative mt-8 flex w-full items-center justify-between">
                                <div className="h-10 w-40 bg-slate-200 text-black"> Catpcha</div>
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
                <div className=" relative flex h-96 w-full  flex-col items-center justify-center bg-[#10162F] p-10 md:mt-0  md:h-[80%] md:w-[30vw]">
                    <p className="absolute left-10 top-10 text-3xl font-bold text-white ">Contact Information</p>
                    <p className="text-xl">support@gmail.com</p>

                    <div className=" absolute bottom-10 left-10 flex gap-5">
                        <CiYoutube size={32} />
                        <CiLinkedin size={32} />
                        <RiTelegramLine size={32} />
                        <AiOutlineDiscord size={32} />
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default ContactPage