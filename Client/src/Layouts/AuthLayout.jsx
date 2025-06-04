import { Outlet } from "react-router-dom"

import loginPageVideo from "../assets/Videos/login-page-video.mp4"

const AuthLayout = () => {
    return (
        <div className='flex h-screen w-full'>

            <div className=" hidden h-full w-3/12 bg-[#FFFFFF]  lg:block">
                <video src={loginPageVideo} muted playsInline autoPlay loop
                    controls={false} className='pointer-events-none h-full w-full object-cover '>
                </video>
            </div>

            <Outlet/>
        </div>
    )
}

export default AuthLayout