import { useState } from "react"
import toast from "react-hot-toast"
import { FaArrowLeftLong } from "react-icons/fa6"
import { MdOutlineOndemandVideo } from "react-icons/md"
import ReactPlayer from "react-player"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import Hamberger_Icon from '../../assets/Images/Hamberger-Icon.svg'
import BreadCrumbs from "../../Components/Course-components/BreadCrumbs"
import { deleteLecture } from "../../Redux/CourseSlice"


const ViewLectures = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const Course = location?.state?.course
    const role = location?.state?.role


    const [course, SetCourse] = useState(Course)

    const lectures = course?.lectures
    const courseName = course?.topic

    const [currentLecture, setCurrentLecture] = useState(lectures ? lectures[0] : null)
    const [isNavigatorOpen, setNavigatorOpen] = useState(false)



    const dispatch = useDispatch()

    const handlePlayLecture = (e, lecture) => {
        // e.preventDefault()

        setTimeout(() => {
            setCurrentLecture(() => lecture)
        }, 0);
    }

    const toggleNavigator = (e) => {
        e.preventDefault()
        setNavigatorOpen(!isNavigatorOpen)

    }

    const handleAddLecture = (e) => {
        e.preventDefault()

        const courseId = course._id
        if (courseId) {
            navigate('/addLecture', { state: { courseId } })
        } else {
            toast.error("CourseId Is Not Provided")
            return
        }
    }

    const handleEditLecture = (e) => {
        e.preventDefault()
        const lecture = currentLecture

        if (course && lecture) {
            navigate('/editLecture', { state: { course, lecture } })
        } else {
            toast.error("Lecture Doesn't Exist")
        }
    }

    const handleDeleteLecture = async (e) => {
        e.preventDefault()

        const courseId = course._id
        const lectureId = currentLecture?._id

        if (courseId && lectureId) {

            const thunkResponse = await dispatch(deleteLecture({ courseId, lectureId }))

            if (thunkResponse?.payload?.Data) {
                const updatedCourse = thunkResponse?.payload?.Data
                SetCourse(updatedCourse)
            }
        } else {
            toast.error("Lecture Doesn't Exist")
            return
        }
    }

    return (
        <div id="viewLecture-page" className="flex min-h-[92vh] flex-col " >

            <div id="heading" className=" flex w-full flex-wrap items-center justify-between px-5 shadow-md">
                <p className="font-bold"><BreadCrumbs secondLast={{ path: '/', name: 'Home' }} last={{ path: '/myCourses', name: 'My Courses' }} current={courseName} /></p>

                <div id="profilePicture" className="flex items-center justify-center">
                </div>

                {(role === 'ADMIN' || role === 'INSTRUCTOR' ) &&
                    <div className=" mb-6 flex justify-end gap-x-5 md:mb-0 md:gap-x-7">
                        <button onClick={handleAddLecture} id="add-new-lecture" className="text-bold btn btn-square btn-primary w-28 rounded-lg text-white md:w-32">Add Lecture</button>

                        <button onClick={handleEditLecture} id="add-new-lecture" className="text-bold btn btn-square w-28 rounded-lg bg-orange-600 text-white hover:bg-orange-700 md:w-32">Edit Lecture</button>

                        <button onClick={() => document.getElementById('delete-lecture').showModal()} id="add-new-lecture" className="text-bold btn btn-square w-28 rounded-lg bg-[#BF2735] text-white hover:bg-red-800 md:w-32">Delete Lecture</button>
                    </div>}
            </div>


            {(course?.noOfLectures === 0 || lectures === undefined) ? <div id=" no-course-available" className="mx-10  flex h-[85vh] flex-col items-center justify-center md:mx-0 md:h-[89vh] ">
                <p className="text-3xl font-bold">No Lecture Available For This Course</p>
            </div>

                : <div id="content" className="relative flex justify-between md:flex-nowrap">

                    {!isNavigatorOpen && <img onClick={toggleNavigator} src={Hamberger_Icon} alt="hamberger-icon" className=" absolute left-2 top-8 z-30 h-8 w-12 cursor-pointer md:hidden " />}


                    <div id="lesson-navigator" className={`absolute z-20 flex min-h-[85vh] w-9/12 flex-col border bg-slate-900 text-white shadow-md transition-all  duration-300  ease-in-out md:h-full md:w-[28%] md:translate-x-0 md:bg-inherit md:text-black ${isNavigatorOpen ? 'translate-x-0 ' : "-translate-x-full"}`}>

                        <div id="sidebar-heading" className="mt-8 flex items-center justify-between px-12 pb-8">

                            <p className=" text-2xl font-bold">Course Content</p>
                            <div className="hidden cursor-pointer md:block" onClick={() => navigate('/myCourses', { state: { role, course } })}><FaArrowLeftLong size={24} /></div>

                            <button onClick={toggleNavigator} className=" absolute  right-6 md:hidden ">
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
                        </div>
                        <hr className="border-1 w-full border-black font-black" />
                        <div id="lessons-list" className="px-6 pt-6">
                            {lectures.map((lecture, index) => <div onClick={(e) => handlePlayLecture(e, lecture)} key={lecture?._id}
                                className="flex cursor-pointer items-center  gap-x-3 py-2">
                                {/* <LuPlayCircle /> */}
                                <div className="w-5"><MdOutlineOndemandVideo /></div>
                                <p className="w-full text-wrap text-lg">{index + 1} {lecture?.title.trim()}</p>

                            </div>)}
                        </div>
                    </div>


                    <div id="videoAndInfomation" className=" z-0 mt-8 flex w-full flex-col px-3 md:pl-[30vw]   ">

                        <p className="ml-14 pb-8 text-2xl font-bold md:ml-16 ">Lesson : {currentLecture?.title}</p>

                        <div className="flex md:ml-16 ">
                            {((currentLecture?.youtubeLink && currentLecture?.youtubeLink?.trim() != "") || currentLecture?.video?.secure_url) ?
                                <div id="video" className='z-10 inline-block  cursor-pointer   border-black'>

                                    <div className="h-56 w-96   md:h-[468px] md:w-[832px]">
                                        <ReactPlayer
                                            url={(currentLecture?.youtubeLink && currentLecture?.youtubeLink.trim() != "") ? currentLecture?.youtubeLink : currentLecture?.video?.secure_url}
                                            controls
                                            width={'100%'}
                                            height={'100%'}
                                            key={currentLecture?._id}
                                        />
                                    </div>

                                    <div id="video-description" className=" mb-28 mt-12 md:mr-24 md:mt-8"> <p className="text-xl font-bold">Description</p>
                                        <p className="mt-4 text-lg">{currentLecture?.description}</p>
                                    </div>
                                </div>

                                : <div>
                                    <div className="flex  h-[468px] w-[832px] items-center justify-center border border-dashed border-black text-xl">
                                        <p>No Video Available For This Lecture</p>
                                    </div>

                                    <div id="video-description" className="mb-28 mt-8 md:mr-24">     <p className="text-xl font-bold">Description</p>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            }


            <dialog id="delete-lecture" className="modal">
                <div className="modal-box">

                    <form method="dialog">
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="pt-5 text-center text-xl font-bold ">Are you sure you want to delete current lecture?</h3>
                    <p className="pt-6 md:pl-5 md:text-lg">You will lose all the content of the lecture.</p>
                    <p className="md:pl-5 md:text-lg">This action can not be undone.</p>
                    <div className="modal-action">
                        <div className="mt-5 flex w-full items-center justify-around md:mt-10">

                            <button onClick={() => navigate(-1)} className=' btn-sqaure btn  mb-2  w-24 rounded-lg border-2   border-slate-700 bg-inherit text-xl text-slate-700 '>Cancel
                            </button>

                            <button onClick={handleDeleteLecture} className=' btn-sqaure w-46  btn btn-md  mb-2 rounded-lg border-none border-black  bg-red-700 text-lg text-white hover:bg-red-800'> Delete Lecture </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ViewLectures