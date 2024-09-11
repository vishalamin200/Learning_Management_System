import { FaArrowRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HeroBg from '../assets/Images/HeroBG2.png';
import HeroImage from '../assets/Images/HeroImage.png';

const HeroSection = () => {
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state?.Auth?.isLoggedIn)

    return (
        <div className="relative flex  flex-wrap pb-16 pt-24  lg:mt-[74px] lg:h-[30rem] " style={{ backgroundImage: `url(${HeroBg})` }}>

            <div className=' flex h-full flex-col  items-center justify-center gap-y-3 px-8 md:items-baseline lg:w-3/5  lg:px-28'>
                <h2 className='text-[4rem]  font-bold  leading-tight text-[#0A083B]'>A broad selection of courses</h2>
                <p className='flex flex-wrap text-xl lg:w-[70%] '>Choose from huge collection of online video courses with new additions published every month</p>

                <div className='buttons mt-6 flex gap-x-5'>
                    <button onClick={() => navigate('/course/all-courses')} className="duration-400 flex h-12 w-40 items-center justify-center rounded-md rounded-l-full rounded-r-full bg-[#7B68EE] p-3 font-bold text-white transition-all ease-in-out hover:border-none hover:bg-inherit hover:bg-white hover:text-[#7B68EE]">Explore Courses</button>

                    {isLoggedIn ? <button onClick={() => navigate('/myCourses')} className="hover:text-bold flex h-12 w-40 items-center justify-center gap-x-1 rounded-md rounded-l-full rounded-r-full border-2 border-[#FEA93F] bg-inherit p-3 font-bold text-[#FEA93F] transition-all duration-500 ease-in-out hover:border-none hover:bg-inherit hover:text-black">Start Learning <FaArrowRight /></button>

                        : <button onClick={() => navigate('/login')} className="hover:text-bold flex h-12 w-40 items-center justify-center gap-x-1 rounded-md rounded-l-full rounded-r-full border-2 border-[#FEA93F] bg-inherit p-3 font-bold text-[#FEA93F] transition-all duration-500 ease-in-out hover:border-none hover:bg-inherit hover:text-black">Login <FaArrowRight /></button>

                    }
                </div>
            </div>
            <img src={HeroImage} alt="Hero Page Image " className=' absolute bottom-0 right-[22%] hidden  h-[100%] object-cover lg:block' />


        </div>
    )
}

export default HeroSection