import { FaRegUser } from "react-icons/fa6";
import { LuBookMinus } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout, logoutUser } from "../../Redux/AuthSlice";

const AvatarContent = ({ isActive }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


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
        <div className={`absolute right-0 top-[9vh] z-40 flex w-60 flex-col items-center justify-center space-y-5 rounded-md  border-2 border-black bg-white py-5 text-lg text-black ${isActive ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-500 ease-in-out`}>

            <Link to={'/myCourses'} className="flex w-full  items-center gap-4 pl-10 "><LuBookMinus /><p>My Courses</p></Link>

            <Link to={'/editProfile'} className="flex w-full  items-center gap-4 pl-10 "><FaRegUser /><p>Profile</p></Link>
            <Link to='/changePassword' className="flex w-full  items-center gap-4 pl-10 "><RiLockPasswordLine /><p>Change Password</p></Link>
            <Link onClick={handleLogout} className="flex w-full  items-center gap-4 pl-10"><MdOutlineLogout /><p>Logout</p></Link>
        </div>
    )
}

export default AvatarContent