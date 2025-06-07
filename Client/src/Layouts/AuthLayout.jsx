import { Outlet } from "react-router-dom"

import loginPageVideo from "../assets/Videos/login-page-video.mp4"

const AuthLayout = () => {
    return (
        <div className='flex min-h-fit w-full overflow-hidden md:h-screen'>

            <div className="hidden h-full w-3/12  lg:block">
                <video src={loginPageVideo} muted playsInline autoPlay loop
                    controls={false} className='pointer-events-none h-full w-full object-cover '>
                </video>
            </div>

            <Outlet />
        </div>
    )
}

export default AuthLayout