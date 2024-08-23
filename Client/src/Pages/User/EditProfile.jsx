
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Default_Profile from '../../assets/Images/Default_Profile.webp';
import HomeLayout from "../../Layouts/HomeLayout";
import { deleteAccount, editProfile } from "../../Redux/AuthSlice";


const EditProfile = () => {

    // Get User Info From LocalStorage
    const { data } = useSelector((state) => state.Auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({ fullName: data?.fullName, email: data?.email, avatar: data?.avatar?.secure_url, removeProfile: false })

    const [previewImage, setPreviewImage] = useState(data.avatar.secure_url)

    const [isEditing, setIsEditing] = useState(true)

    const inputRef = useRef(null)


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
        setIsEditing(true)
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
            setUserInfo({ fullName: data.fullName, email: data.email, avatar: data.avatar.secure_url, removeProfile: false })

            setPreviewImage(data.avatar.secure_url)
        }
    }, [isEditing, data])


    const handleSubmit = async (event) => {
        event.preventDefault()

        const { fullName } = event.target.elements

        //All values are Provided?
        if (fullName.value.length <= 3) {
            toast.error("Name Is Too Short")
            return
        }

        const formData = new FormData()
        formData.append('fullName', userInfo.fullName)
        formData.append('avatar', userInfo.avatar)
        formData.append('removeProfile', userInfo.removeProfile)


        // creating Account
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

            <div className="flex items-center justify-center bg-[#bcc7d6]  text-xl">
                <div className="flex h-screen w-screen items-center justify-around md:w-3/4 lg:w-1/2">

                    <div className=' flex h-[80vh] w-10/12 flex-col items-center justify-around rounded-2xl border-2  bg-white shadow-xl  md:mt-12 md:h-[85vh] md:w-8/12'>

                        <div className='flex items-center justify-center pt-3 text-3xl font-bold'><h1>Edit Your Profile</h1>
                        </div>

                        <form noValidate onSubmit={handleSubmit} className='relative flex w-3/4 flex-col items-center justify-center'>


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
                            <p onClick={handleRemoveProfile} className="mt-5 text-base">Remove Profile Picture
                            </p>

                            <div>
                                <div className="mb-2 mt-5 w-full">
                                    <p className="py-1 text-lg">Full Name</p>

                                    <label htmlFor="fullName" className='flex flex-col'>
                                        <div className="flex  items-center gap-4">
                                            <CiUser />

                                            <input
                                                onChange={handleChange}
                                                ref={inputRef}
                                                readOnly={!isEditing}
                                                type="text"
                                                name="fullName"
                                                value={userInfo.fullName}
                                                id="fullName"
                                                placeholder='Enter Your Name'
                                                className='w-10/12 border-none bg-transparent  text-xl outline-none' />
                                        </div>
                                        <hr className="my-1" />
                                    </label>
                                </div>

                                <div className="my-2 w-full">

                                    <p className="py-1 text-lg">Email</p>

                                    <label htmlFor="userEmail" className='flex flex-col'>
                                        <div className="flex  items-center gap-4">
                                            <AiOutlineMail className="text-slate-500" />
                                            <input
                                                readOnly
                                                type="email"
                                                name="email"
                                                value={userInfo.email}
                                                id="userEmail"
                                                placeholder='Enter Your Email'
                                                className='w-10/12 cursor-not-allowed border-none bg-transparent   text-xl outline-none' />
                                        </div>
                                        <hr className="my-1" />
                                    </label>
                                </div>
                            </div>
                            <div>
                            </div>
                            <div className=" mt-10 flex  w-full justify-around gap-x-4 ">

                                <button onClick={toggleEdit} className=' btn-sqaure btn  mb-2  w-24 rounded-lg border-2   border-slate-700 bg-inherit text-xl text-slate-700 '>{isEditing ? "Cancel" : "Edit"}</button>

                                <button onSubmit={handleSubmit} className=' btn-sqaure btn  btn-md mb-2  w-24 rounded-lg border-none border-black  bg-slate-600 text-xl text-white hover:bg-slate-700'>Save</button>
                            </div>
                        </form>

                        <div className="mt-1 flex items-center justify-center gap-2">
                            <p className="text-lg text-red-700"><a href="#deleteAccountModel" className="text-lg text-red-700">Permanently delete your account</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal" role="dialog" id="deleteAccountModel">
                <div className="modal-box">
                    <h3 className="text-center  text-xl font-bold">Are you sure you want to delete your account?</h3>
                    <p className="text-md pt-6">You will lose all active subscriptions if any.</p>
                    <p className="text-md">This action can not be undone.</p>
                    <div className="modal-action">
                        <div className=" mt-10 flex w-full items-center justify-around">

                            <button onClick={() => navigate(-1)} className=' btn-sqaure btn  mb-2  w-24 rounded-lg border-2   border-slate-700 bg-inherit text-xl text-slate-700 '>Cancel
                            </button>

                            <button onClick={handleDeleteAccount} className=' btn-sqaure w-46  btn btn-md  mb-2 rounded-lg border-none border-black  bg-red-700 text-lg text-white hover:bg-red-800'> Delete Account </button>
                        </div>
                    </div>
                </div>
            </div>

        </HomeLayout>
    )
}

export default EditProfile