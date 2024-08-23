import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegAddressCard } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { RiLinkedinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Default_Profile from '../../assets/Images/Default_Profile.webp';
import deleteLogo from '../../assets/Logos/deleteLogo.png';
import HomeLayout from "../../Layouts/HomeLayout";
import { deleteAccount, editProfile } from "../../Redux/AuthSlice";


const NewEditProfilePage = () => {

    const { data } = useSelector((state) => state.Auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({ fullName: data?.fullName, email: data?.email, contact: data?.contact, linkedin: data?.linkedin, address: data?.address, avatar: data?.avatar?.secure_url, removeProfile: false })

    const [previewImage, setPreviewImage] = useState(data?.avatar?.secure_url)

    const [isEditing, setIsEditing] = useState(false)

    const inputRef = useRef(null)

    const createdAt = new Date(data?.createdAt)

    const joinDate = createdAt.toLocaleDateString('en-GB',{'day':'2-digit',"month":"short",'year':"numeric"})

    const joinTime = createdAt.toLocaleTimeString('en-US',{'timeZone':'Asia/Kolkata','hour':'2-digit','minute':'2-digit','second':'2-digit'})



    const handleFileUpload = (e) => {
        const uploadedImage = e.target.files[0]

        if (uploadedImage && isEditing) {
            setUserInfo({
                ...userInfo,
                avatar: uploadedImage
            })

            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)

            fileReader.addEventListener('load', () => {
                setPreviewImage(fileReader.result)
            })
        } else {
            return
        }
    }

    const handleRemoveProfile = (e) => {
        e.preventDefault()
        setPreviewImage(Default_Profile)
        setUserInfo({ ...userInfo, removeProfile: true, avatar: undefined })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setUserInfo({
            ...userInfo,
            [name]: value
        })
    }

    const toggleEdit = (e) => {
        e.preventDefault()
        setIsEditing(!isEditing)

        setTimeout(() => {
            inputRef.current.focus()
        }, 0)
    }

    useEffect(() => {
        if (!isEditing) {
            setUserInfo({ fullName: data?.fullName, email: data?.email, contact: data?.contact, linkedin: data?.linkedin, address: data?.address, avatar: data?.avatar?.secure_url, removeProfile: false })

            setPreviewImage(data?.avatar?.secure_url || Default_Profile)
        }
    }, [isEditing, data])


    const handleSubmit = async (event) => {
        event.preventDefault()

        const { fullName, contact, linkedin, address } = event.target.elements

        //All values are Provided?
        if (fullName.value.length <= 3) {
            toast.error("Name Is Too Short")
            return
        }

        //valid contact number?
        if (contact.value.length > 0) {

            const contactRegex = /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g
            if (!contact.value.match(contactRegex)) {
                toast.error("Provide Valid Contact Number")
                return
            }
        }

        //linkedin link is correct link?
        if (linkedin.value.length > 0) {
            const linkRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            if (!linkedin.value.match(linkRegex)) {
                toast.error("Provide Valid LinkedIn Link")
                return
            }
        }

        // address length should not be less than 3
        if (address.value.length > 0 && address.value.length < 4) {
            toast.error("Address Is Too Short")
            return
        }

        const formData = new FormData()
        const fields = ['fullName', 'contact', 'linkedin', 'address', 'avatar', 'removeProfile']
        fields.forEach((field) => formData.append(field, userInfo[field]))


        const response = await dispatch(editProfile(formData))

        if (response?.payload?.Data?.User) {

            setIsEditing(false)
            setUserInfo({ fullName: data.fullName, email: data.email, avatar: data.avatar.secure_url })

        } else {
            return
        }
    }

    const handleDeleteAccount = async (e) => {
        e.preventDefault()

        const thunkPromise = await dispatch(deleteAccount())
        if (thunkPromise?.payload?.Message) {
            navigate('/')
        }
    }


    return (

        <HomeLayout>
            <div >
                <form noValidate onSubmit={handleSubmit} className={`flex w-[100%] flex-col items-center justify-center  bg-slate-500 pt-20 text-white md:flex md:h-screen md:flex-row `}>

                    {/* bg-[#181A1B] */}
                    <div className=" relative mt-8 flex h-96  w-[80vw] flex-col items-center justify-center bg-[#10162F] p-10 md:mt-0 md:h-[80%] md:w-[30vw]">
                        <div>
                            <label htmlFor="avatar" >
                                <div className=" border-1 h-36 w-36 cursor-pointer rounded-full">
                                    {
                                        previewImage ? <img src={previewImage} alt="profile picture" className="h-36 w-36 cursor-pointer rounded-full" />
                                            : <img src={Default_Profile} alt="profile picture" />
                                    }
                                </div>

                            </label>

                            {isEditing && <input
                                onChange={handleFileUpload}
                                type="file"
                                name="avatar"
                                id="avatar"
                                accept=".jpg, .jpeg, .svg, .png"
                                className="hidden" />}
                        </div>

                        {isEditing && <p onClick={handleRemoveProfile} className="mt-5 cursor-pointer text-base">Remove Profile Picture
                        </p>}

                        <p className="mt-5 text-lg">{userInfo.fullName}</p>
                        <p className="mt-5 text-2xl">{userInfo.email}</p>
                        <p className="text-md mt-2">Joined <span>{joinDate}</span></p>
                        <p className="text-md mt-1"><span>{joinTime}</span></p>

                    </div>


                    <div className="flex w-[80%] flex-col justify-center self-center  border-2 bg-white p-6 text-black md:h-[80%]  md:w-[50vw] md:px-10">

                        <div id="heading" className="flex items-center justify-center pb-5 pt-3">
                            <p className="text-3xl font-semibold text-black">Personal Information</p>
                        </div>


                        <div className="flex flex-wrap md:justify-between">

                            <div className="mb-2 mt-5 w-full md:w-[45%]">
                                <p className="py-1 text-lg">Full Name</p>

                                <label htmlFor="fullName" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <FaRegUser />

                                        <input
                                            onChange={handleChange}
                                            ref={inputRef}
                                            readOnly={!isEditing}
                                            type="text"
                                            name="fullName"
                                            value={userInfo.fullName}
                                            id="fullName"
                                            placeholder='Not Provided'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>

                            <div className="mb-2 mt-5 w-full md:w-[45%]">
                                <p className="py-1 text-lg">Email</p>

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
                                            className='w-10/12 cursor-not-allowed border-none  bg-transparent text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>
                            <div className="mb-2 mt-5 w-full md:w-[45%]">
                                <p className="py-1 text-lg">Contact Number</p>

                                <label htmlFor="contact" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <MdOutlineLocalPhone />

                                        <input
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                            type="text"
                                            name="contact"
                                            value={userInfo.contact}
                                            id="contact"
                                            placeholder='Not Provided'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>
                            <div className="mb-2 mt-5 w-full md:w-[45%]">
                                <p className="py-1 text-lg">LinkedIn</p>

                                <label htmlFor="linkedin" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <RiLinkedinLine />

                                        <input
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                            type="text"
                                            name="linkedin"
                                            value={userInfo.linkedin}
                                            id="linkedin"
                                            placeholder='Not Provided'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>
                            <div className="mb-2 mt-5 w-full ">
                                <p className="py-1 text-lg">Address</p>

                                <label htmlFor="address" className='flex flex-col'>
                                    <div className="flex  items-center gap-4">
                                        <FaRegAddressCard />

                                        <input
                                            onChange={handleChange}
                                            readOnly={!isEditing}
                                            type="text"
                                            name="address"
                                            value={userInfo.address}
                                            id="address"
                                            placeholder='Not Provided'
                                            className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                    </div>
                                    <hr className="my-1" />
                                </label>
                            </div>


                            <div className="relative mt-8 flex w-full items-center justify-between">

                                <div id="editButton" className="">
                                    <label htmlFor="edit" className="flex h-12 w-24 cursor-pointer items-center justify-center rounded-xl border border-[#10162F] bg-inherit
                        text-black transition-all duration-300 ease-in-out hover:bg-[#10162F] hover:text-white ">{isEditing ? "Cancel" : "Edit"}</label>
                                    <button onClick={toggleEdit} id="edit" className="hidden"></button>
                                </div>

                                {isEditing && <div id="submitButton" className="">
                                    <label htmlFor="submit" className="flex h-12 w-24 cursor-pointer items-center justify-center rounded-xl border border-[#10162F] bg-inherit
                        text-black transition-all duration-300 ease-in-out hover:bg-[#10162F] hover:text-white "><p>Save</p></label>
                                    <button onSubmit={handleSubmit} type="submit" id="submit" className="hidden"></button>
                                </div>
                                }

                            </div>
                        </div>

                        <div className="mt-1 flex items-center justify-center gap-2">
                            <p className="text-lg text-red-700"><a href="#deleteAccountModel" className="flex items-center justify-center gap-x-1 text-lg font-semibold text-[#BF2735]"><img src={deleteLogo} alt="deleteLogo" className="h-5 w-5" /> Delete Account</a></p>
                        </div>
                    </div>
                </form>

                <div className="modal text-black" role="dialog" id="deleteAccountModel">
                    <div className="modal-box">
                        <h3 className="text-center  text-xl font-bold ">Are you sure you want to delete your account?</h3>
                        <p className="text-md pt-6 md:pl-5">You will lose all active subscriptions if any.</p>
                        <p className="text-md md:pl-5">This action can not be undone.</p>
                        <div className="modal-action">
                            <div className=" mt-10 flex w-full items-center justify-around">

                                <button onClick={() => navigate(-1)} className=' btn-sqaure btn  mb-2  w-24 rounded-lg border-2   border-slate-700 bg-inherit text-xl text-slate-700 '>Cancel
                                </button>

                                <button onClick={handleDeleteAccount} className=' btn-sqaure w-46  btn btn-md  mb-2 rounded-lg border-none border-black  bg-red-700 text-lg text-white hover:bg-red-800'> Delete Account </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bg-[#323F90]  */}

            </div>
        </HomeLayout>
    )
}

export default NewEditProfilePage