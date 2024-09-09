
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";

const NotFoundPage = () => {
    const navigate = useNavigate()

    return (
        <HomeLayout>
            <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#bcc7d6] pt-12 md:pt-16 ">

                <p className="my-2 text-center font-mono text-8xl font-extrabold">Error 404</p>

                <p className="my-2 text-4xl text-blue-400">Page Not Found</p>

                <div className="flex w-[45vh] flex-wrap md:w-[90vh] "><p className="my-4 text-center text-lg font-semibold ">Oops!! the page you are looking for doesn&apos;t exist or an other error occurred</p>
                </div>


                <button onClick={() => navigate(-1)} className="m-20 flex h-[6vh] w-[30vh] items-center justify-center rounded-3xl bg-[#EFA14B] font-bold"> <FaArrowLeftLong /> &nbsp; Go Back</button>

            </div>
        </HomeLayout>
    )
}

export default NotFoundPage