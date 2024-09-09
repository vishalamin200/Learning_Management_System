import { FaChevronLeft, FaRegMessage } from 'react-icons/fa6';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { ImSphere } from 'react-icons/im';
import { RxDiscordLogo } from 'react-icons/rx';
import { SlCalender } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCommunityExtended, setDrawer } from '../../Redux/DrawerSlice';



const InsideCommunity = () => {

    const dispatch = useDispatch()


    //Must be customised based on userInfo

    const { isCommunityExtended } = useSelector((state) => state.Drawer)


    const handleLinkClick = () => {
        dispatch(setDrawer(false))
        dispatch(setCommunityExtended(false))
    }

    return (
        <div id="profile-extended" className={` fixed left-0 top-[65px]  flex h-full  w-screen flex-col  bg-[#FFFFFF] text-white md:h-[90vh] md:w-[45vw] ${isCommunityExtended ? 'translate-x-0' : '-translate-x-full'} z-30 transition-all  duration-300 ease-in-out lg:hidden`}>


            <div onClick={() => dispatch(setCommunityExtended(false))} className="ml-7 mt-5 flex items-center gap-x-3  ">
                <div className=' text-black'>
                    <FaChevronLeft />
                </div>
                <div className=" flex items-center text-black">
                    <div id="back" className='text-lg'>Back</div>
                </div>
            </div>


            <hr className='my-4' />
            <nav id='content' className='ml-7 mt-1 flex flex-col gap-y-6 text-xl text-black'>
                <div>
                    <p className='py-2  text-2xl font-bold'>Community</p>
                </div>

                <Link onClick={handleLinkClick} to={'/'} >
                    <div className="flex w-full  items-center gap-4  ">
                        <FaRegMessage /><p>Foreums</p>
                    </div>
                </Link>

                <Link onClick={handleLinkClick} to={'/'} >
                    <div className="flex w-full  items-center gap-4  ">
                        <RxDiscordLogo /><p>Discord</p>
                    </div>
                </Link>

                <Link onClick={handleLinkClick} to={'/'} >
                    <div className="flex w-full  items-center gap-4 ">
                        <ImSphere /><p>Clubs</p>
                    </div>
                </Link>

                <Link onClick={handleLinkClick} to={'/'} >
                    <div className="flex w-full  items-center gap-4  ">
                        <SlCalender /><p>Events</p>
                    </div>
                </Link>

                <Link onClick={handleLinkClick} to={'/'} >
                    <div className="flex w-full  items-center gap-4  ">
                        <HiMiniUserGroup />
                        <p>Code Crew</p>
                    </div>
                </Link>

            </nav>
        </div>
    )
}

export default InsideCommunity