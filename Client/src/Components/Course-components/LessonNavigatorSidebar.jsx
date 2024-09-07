import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

 import Default_Profile from '../assets/Images/Default_Profile.webp';
import Hamberger_Icon from '../assets/Images/Hamberger-Icon.svg';
import { logout, logoutUser } from '../Redux/AuthSlice';


const LessonNavigator = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()


    //Must be customised based on userInfo
    const { data, isLoggedIn = true } = useSelector((state) => state?.Auth)

    const fullName = data?.fullName 
    const email = data?.email 
    const profile = data?.avatar?.secure_url || Default_Profile


    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isProfileExtended, setIsProfileExtended] = useState(false)

    const toggleDrawer = () => {

        setIsDrawerOpen(!isDrawerOpen)
    }

    const toggleProfileExtended = () => {
        setIsProfileExtended(!isProfileExtended)
    }

    const handleLogout = async () => {
        const promise = await dispatch(logout())

        if (promise?.payload?.Message) {
            console.log("Message In handleOutput:", promise?.payload?.Message)
            localStorage.clear()
            dispatch(logoutUser())
            navigate('/')
        } else {
            return
        }
    }

    return (
        <div id="drawer" className={` absolute left-0 top-[10vh]  flex h-[72vh]  w-screen flex-col rounded-lg bg-slate-400 text-white md:h-[90vh] md:w-[30vw] ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} z-30 transition-all  duration-500 ease-in-out lg:hidden`}>

            {isDrawerOpen ? <button onClick={toggleDrawer} className="btn-outline-none btn  btn-circle absolute right-10 top-[30px]  z-50 h-10 min-h-8 w-10  min-w-8 border-none  bg-inherit md:btn-outline hover:bg-slate-500   md:bg-slate-400 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

                : <button onClick={toggleDrawer} className='absolute right-[-70px] h-10  min-h-8 w-10 min-w-8 transition-all'>
                    <img src={Hamberger_Icon} alt='hamberger-icon' />
                </button>
            }


            {(isLoggedIn) ? <div className="ml-7 mt-5 flex flex-col">
                <div id="profile_picture" className="avatar mb-3">
                    <div className="w-[70px] rounded-full">
                        <img src={profile} alt="profile picture" /></div>
                </div>

                <div className='flex justify-between'>

                    <div>
                        <h2 className='text-xl font-bold text-black '>{fullName}</h2>
                        <p className=' text-md text-slate-600'>{email}</p>
                    </div>

                    <div>
                        <button className='relative right-10 flex h-8 w-12 items-end justify-center transition-none duration-500' onClick={toggleProfileExtended}><FaChevronDown /></button>
                    </div>
                </div>

                {isProfileExtended && <div className='mt-4 flex flex-col gap-y-1 text-black'>
                    <Link to="/editProfile"><p>Edit Profile</p></Link>
                    <Link to="/changePassword" ><p>Change Password</p></Link>
                </div>}

            </div>
                : <div className="ml-7 mt-12 flex flex-col gap-y-2">
                    <div >
                        <button onClick={() => navigate('/login')} className=' btn-sqaure btn  mb-2  w-40 rounded-lg border-black bg-inherit text-black'>Login</button>
                    </div>
                    <button onClick={() => navigate('/signup')} className=' btn-sqaure btn  btn-md mb-2  w-40 rounded-lg border-none border-black bg-orange-300 text-black hover:bg-orange-400 active:bg-orange-400'>Create An Account</button>
                </div>
            }

            <hr className='my-4' />
            <nav id='content' className='ml-7 flex flex-col gap-y-2 text-lg text-black'>
                <Link to={'/'} >Home</Link>
                <Link to={'/Course'} >Course</Link>
                <Link to={'/'} >Contact</Link>
                <Link to={'/Profile'} >Profile</Link>
            </nav>

            {isLoggedIn &&
                <div className='absolute bottom-3 right-5 mx-5 flex justify-end'>
                    <button onClick={handleLogout} className='btn btn-sm mb-4 h-10 min-h-4 w-20 border-black bg-inherit text-black'>Logout</button>
                </div>
            }
        </div>
    )
}

export default LessonNavigator