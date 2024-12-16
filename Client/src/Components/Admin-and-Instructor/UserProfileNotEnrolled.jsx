import PropTypes from 'prop-types';
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

import deleteLogo from '../../assets/Logos/deleteLogo.png';
import { setDeleteUser, toggleViewProfile } from '../../Redux/StatisticsSlice';
import ViewProfile from './ViewProfile';

const UserProfileNotEnrolled = ({ userDetails }) => {

    const { viewProfile } = useSelector((state) => state.Statistics)
    const dispatch = useDispatch()

    return (
        <div key={userDetails?._id} className="flex w-full justify-around gap-x-10 rounded-lg pr-5 hover:bg-slate-200" >

            <div onClick={() => dispatch(toggleViewProfile(userDetails?._id))} id="avatar-name" className="relative flex w-80 cursor-pointer items-center gap-x-5 py-3">

                <label htmlFor="avatar" className='pl-5' >
                    <div className=" border-1 h-12 w-12 cursor-pointer rounded-full ">
                        <img src={userDetails?.avatar?.secure_url} alt="profile picture" className="h-12 w-12 cursor-pointer rounded-full" />
                    </div>
                </label>

                <div className="items-between flex flex-col">
                    <p className="text-lg font-bold">{userDetails?.fullName}</p>
                    <p className="text-md ">{userDetails?.email}</p>
                </div>

                {(viewProfile == userDetails?._id) && <div className="absolute inset-0 bg-transparent "> <div className="relative top-24 z-30 min-h-fit min-w-[35rem] rounded-md  bg-white pb-3 pt-2 shadow-lg">
                    <ViewProfile userInfo={userDetails} />
                </div> </div>}
            </div>


            <div id="Options" className="flex items-center gap-3">
                <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${userDetails?.email}&authuser=codeacademy2024@gmail.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <IoMailOutline size={20} />
                </a>


                <div className="  hidden items-center justify-center gap-2 lg:flex">
                    <p className="text-lg text-red-700">
                        <a href="#deleteUserAccountModel" className="flex items-center justify-center gap-x-1 text-lg font-semibold text-[#BF2735]"><img onClick={() => dispatch(setDeleteUser(userDetails?._id))} src={deleteLogo} alt="deleteLogo" className="h-5 w-5" /> </a>
                    </p>
                </div>
            </div>
        </div>
    )
}


UserProfileNotEnrolled.propTypes = {
    userDetails: PropTypes.object
}

export default UserProfileNotEnrolled