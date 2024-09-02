
import PropTypes from 'prop-types';
import { FaRegMessage } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { ImSphere } from "react-icons/im";
import { RxDiscordLogo } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";

const CommunityContent = ({ isActive }) => {
    return (
        <div className={`absolute right-1/2 top-[9vh] z-40 flex w-60 flex-col items-center justify-center space-y-5 rounded-md  border-2 border-black bg-white py-5 text-lg text-black ${isActive ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-500 ease-in-out`}>

            <div className="flex w-full  items-center gap-4 pl-10 "><FaRegMessage /><p>Foreums</p></div>
            <div className="flex w-full  items-center gap-4 pl-10 "><RxDiscordLogo /><p>Discord</p></div>
            <div className="flex w-full  items-center gap-4 pl-10"><ImSphere /><p>Clubs</p></div>
            <div className="flex w-full  items-center gap-4 pl-10 "><SlCalender /><p>Events</p></div>
            <div className="flex w-full  items-center gap-4 pl-10 "><HiMiniUserGroup /><p>Code Crew</p></div>
        </div>
    )
}

CommunityContent.propTypes = {
    isActive: PropTypes.bool
}

export default CommunityContent