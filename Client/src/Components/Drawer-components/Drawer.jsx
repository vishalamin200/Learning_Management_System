import { FaChevronRight } from 'react-icons/fa6';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { IoMdBook } from 'react-icons/io';
import { IoBriefcaseOutline, IoHomeOutline } from 'react-icons/io5';
import { LuBookMinus } from 'react-icons/lu';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Default_Profile from '../../assets/Images/Default_Profile.webp';
import { setCommunityExtended, setDrawer, setResourceExtended, toggleDrawer, toggleProfileExtended } from '../../Redux/DrawerSlice';



const Drawer = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    //Must be customised based on userInfo
    const { data, isLoggedIn } = useSelector((state) => state?.Auth)
    const { isDrawerOpen } = useSelector((state) => state.Drawer)

    const fullName = data?.fullName || ""
    const profile = data?.avatar?.secure_url ? data?.avatar?.secure_url : Default_Profile


    const handleLogin = () => {
        navigate('/login')
        dispatch(setDrawer(false))
    }

    const handleSignup = () => {
        navigate('/signup')
        dispatch(setDrawer(false))
    }


    return (
        <div id="drawer" className={` fixed left-0 top-[65px]  flex h-full  w-screen flex-col  bg-[#FFFFFF] text-black md:h-[90vh] md:w-[45vw] ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} z-30 transition-all  duration-300 ease-in-out lg:hidden`}>


            {(isLoggedIn) ?

                <div onClick={() => dispatch(toggleProfileExtended())} className="ml-7 mt-5 flex items-center justify-between  ">
                    <div className=" flex items-center">
                        <img name="avatar" src={profile} alt="user-profile" className="mr-3 h-16 w-16 cursor-pointer rounded-full" />
                        <div >
                            <p className="text-md m-0 p-0 font-bold italic text-[#E97862]">Hey</p>
                            <p className="m-0 p-0 text-lg font-bold ">{fullName}</p>
                        </div>
                    </div>
                    <div className='pr-8 text-black'>
                        <FaChevronRight />
                    </div>
                </div>


                : <div className="mb-3 ml-7 mt-8 flex  gap-x-5">

                    <button onClick={handleLogin} className='  w-40 rounded-lg    border  border-orange-500 bg-inherit font-bold  text-orange-400'>Login</button>

                    <button onClick={handleSignup} className=' btn-sqaure btn  btn-md   w-40 rounded-lg border-none border-black bg-orange-300 text-black hover:bg-orange-400 active:bg-orange-400'>Create An Account</button>
                </div>
            }

            <hr className='my-4' />
            <nav id='content' className='ml-7 flex flex-col gap-y-4 text-lg '>

                <Link onClick={() => dispatch(toggleDrawer())} to={'/'} >
                    <div className='flex items-center gap-x-3'>
                        <IoHomeOutline /><h2>Home</h2></div></Link>

                <Link onClick={() => dispatch(toggleDrawer())} to={'/course/all-courses'} className='flex items-center justify-between '>
                    <div className='flex items-center gap-x-3'>
                        <LuBookMinus /><h2>Courses</h2></div></Link>

                <Link onClick={() => dispatch(setResourceExtended(true))} to={'/resources'} className='flex items-center justify-between' >
                    <div className='flex items-center gap-x-3'>
                        <IoMdBook /><h2>Resources</h2></div>

                    <div className='pr-8 '>
                        <FaChevronRight size={14} />
                    </div>
                </Link>

                <Link onClick={() => dispatch(setCommunityExtended(true))} to={'/community'} className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-3'>
                        <HiOutlineUserGroup /><h2>Community</h2></div>
                    <div className='pr-8 '>
                        <FaChevronRight size={14} />
                    </div>
                </Link>

                <Link onClick={() => dispatch(toggleDrawer())} to={'/contact'} ><div className='flex items-center gap-x-3'>
                    <MdOutlineLocalPhone /><h2>Contact</h2></div></Link>
                <Link onClick={() => dispatch(toggleDrawer())} to={'/career'} ><div className='flex items-center gap-x-3'>
                    <IoBriefcaseOutline /><h2>Career</h2></div></Link>

            </nav>
        </div>
    )
}

export default Drawer