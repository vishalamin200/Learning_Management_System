

import PropTypes from 'prop-types'
import { FaRegAddressCard, FaRegUser } from 'react-icons/fa6'
import { MdOutlineEmail, MdOutlineLocalPhone } from 'react-icons/md'
import { RiLinkedinLine } from 'react-icons/ri'

const ViewProfile = ({ userInfo }) => {

    const createdAt = new Date(userInfo?.createdAt)
    const joinDate = createdAt.toLocaleDateString('en-GB', { 'day': '2-digit', "month": "short", 'year': "numeric" })

    const joinTime = createdAt.toLocaleTimeString('en-US', { 'timeZone': 'Asia/Kolkata', 'hour': '2-digit', 'minute': '2-digit', 'second': '2-digit' })

    return (

        <div className="flex w-full flex-col flex-wrap justify-center   self-center  bg-white text-black  lg:h-full lg:w-full lg:px-10">

            <div id="heading" className="flex items-center justify-between  ">
                <p className="text-lg font-semibold text-black">Personal Information</p>

                <div className="mt-1  hidden items-center justify-center gap-2 lg:flex">
                    <p className="text-md text-green-700">
                        <p className="mt-2 text-sm">Joined <span>{joinDate}</span></p>
                        <p className="mt-1 text-sm"><span>{joinTime}</span></p>
                    </p>
                </div>
            </div>


            <div className="flex flex-wrap lg:justify-between">

                <div className="mb-2 mt-2 w-full lg:w-[45%]">
                    <p className="py-1 text-sm">Full Name</p>

                    <label htmlFor="fullName" className='flex flex-col'>
                        <div className="flex  items-center gap-4">
                            <FaRegUser />

                            <input
                                readOnly={true}
                                type="text"
                                name="fullName"
                                value={userInfo.fullName}
                                id="fullName"
                                placeholder='Not Provided'
                                className='text-md w-10/12 border-none  bg-transparent outline-none' />
                        </div>
                        <hr className="my-1" />
                    </label>
                </div>

                <div className="mb-2 mt-2 w-full lg:w-[45%]">
                    <p className="py-1 text-sm">Email</p>

                    <label htmlFor="email" className='flex flex-col '>
                        <div className="flex  items-center gap-4 ">
                            <MdOutlineEmail className="text-slate-500" />

                            <input
                                readOnly
                                type="email"
                                name="email"
                                value={userInfo.email}
                                id="userEmail"
                                placeholder='Not Provided'
                                className='text-md w-10/12   border-none bg-transparent outline-none' />
                        </div>
                        <hr className="my-1" />
                    </label>
                </div>
                <div className="mb-2  w-full lg:w-[45%]">
                    <p className="py-1 text-sm">Contact Number</p>

                    <label htmlFor="contact" className='flex flex-col'>
                        <div className="flex  items-center gap-4">
                            <MdOutlineLocalPhone />

                            <input
                                readOnly={true}
                                type="text"
                                name="contact"
                                value={userInfo.contact}
                                id="contact"
                                placeholder='Not Provided'
                                className='text-md w-10/12 border-none  bg-transparent outline-none' />
                        </div>
                        <hr className="my-1" />
                    </label>
                </div>
                <div className="mb-2 w-full lg:w-[45%]">
                    <p className="py-1 text-sm">LinkedIn</p>

                    <label htmlFor="linkedin" className='flex flex-col'>
                        <div className="flex  items-center gap-4">
                            <RiLinkedinLine />

                            <input
                                readOnly={true}
                                type="text"
                                name="linkedin"
                                value={userInfo.linkedin}
                                id="linkedin"
                                placeholder='Not Provided'
                                className='text-md w-10/12 border-none  bg-transparent outline-none' />
                        </div>
                        <hr className="my-1" />
                    </label>
                </div>
                <div className="mb-2  w-full ">
                    <p className="py-1 text-sm">Address</p>

                    <label htmlFor="address" className='flex flex-col'>
                        <div className="flex  items-center gap-4">
                            <FaRegAddressCard />

                            <input
                                readOnly={true}
                                type="text"
                                name="address"
                                value={userInfo.address}
                                id="address"
                                placeholder='Not Provided'
                                className='text-md w-10/12 border-none  bg-transparent outline-none' />
                        </div>
                        <hr className="my-1" />
                    </label>
                </div>
            </div>
        </div>
    )
}

ViewProfile.propTypes = {
    userInfo: PropTypes.object
}

export default ViewProfile