import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import DeniedIcon from "../assets/Images/DeniedIcon";
import HomeLayout from "../Layouts/HomeLayout";

const AccessDeniedPage = () => {
    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#bcc7d6]">
                <div>
                    <DeniedIcon />
                    <p className="mx-2  text-5xl font-extrabold md:text-6xl">Access Denied</p>
                </div>
                <div className="m-12 flex flex-col items-center justify-center">
                    <p className="text-center text-base">You do not have permission to view this page, Please check your credentials or contact administrator</p>


                    <button onClick={() => navigate(-1)} className="m-20 flex h-[6vh] w-[30vh] items-center justify-center rounded-3xl bg-[#EFA14B] font-bold"> <FaArrowLeftLong /> &nbsp; Go Back</button>

                </div>
            </div>
        </HomeLayout>
    )
}

export default AccessDeniedPage