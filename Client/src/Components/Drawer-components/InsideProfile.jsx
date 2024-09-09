import { FaChevronLeft, FaRegUser } from 'react-icons/fa6';
import { LuBookMinus } from 'react-icons/lu';
import { MdOutlineLogout, MdOutlinePayments } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout, logoutUser } from '../../Redux/AuthSlice';
import { setDrawer, setProfileExtended, toggleProfileExtended } from '../../Redux/DrawerSlice';



const InsideProfile = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    //Must be customised based on userInfo

    const { isProfileExtended } = useSelector((state) => state.Drawer)

    const handleLogout = async () => {


        const promise = await dispatch(logout())

        if (promise?.payload?.Message) {
            console.log("Message In handleOutput:", promise?.payload?.Message)
            localStorage.clear()
            dispatch(logoutUser())

            dispatch(setDrawer(false))
            dispatch(setProfileExtended(false))
            navigate('/')
        } else {
            return
        }
    }

    const handleLinkClick = () => {
        dispatch(setDrawer(false))
        dispatch(setProfileExtended(false))
    }

    return (
        <div id="profile-extended" className={` fixed left-0 top-[65px]  flex h-full  w-screen flex-col  bg-[#FFFFFF] text-white md:h-[90vh] md:w-[45vw] ${isProfileExtended ? 'translate-x-0' : '-translate-x-full'} z-30 transition-all  duration-300 ease-in-out lg:hidden`}>


            <div onClick={() => dispatch(toggleProfileExtended())} className="ml-7 mt-5 flex items-center gap-x-3  ">
                <div className=' text-black'>
                    <FaChevronLeft />
                </div>
                <div className=" flex items-center text-black">
                    <div id="back" className='text-lg'>Back</div>
                </div>
            </div>


            <hr className='my-4' />
            <nav id='content' className='ml-7 mt-2 flex flex-col gap-y-6 text-lg text-black'>


                <Link onClick={handleLinkClick} to={'/myCourses'} className="flex w-full  items-center gap-4  ">
                    <LuBookMinus /><p>My Courses</p>
                </Link>

                <Link onClick={handleLinkClick} to={'/editProfile'} className="flex w-full  items-center gap-4  ">
                    <FaRegUser /><p>Profile</p>
                </Link>
                <Link onClick={handleLinkClick} to='/changePassword' className="flex w-full  items-center gap-4  ">
                    <RiLockPasswordLine /><p>Change Password</p>
                </Link>

                <Link onClick={handleLinkClick} to='/my-courses/purchase-history' className="flex w-full  items-center gap-4  ">
                    <MdOutlinePayments />
                    <p>Purchase History</p>
                </Link>

                <Link onClick={handleLogout} className="flex w-full  items-center gap-4 ">
                    <MdOutlineLogout /><p>Logout</p>
                </Link>

            </nav>

        </div>
    )
}

export default InsideProfile