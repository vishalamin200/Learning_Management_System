import { useState } from "react"
import toast from "react-hot-toast"
import ReactPlayer from "react-player"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from "../../Layouts/HomeLayout"
import { addLecture } from "../../Redux/CourseSlice"

const AddLecture = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const courseId = location?.state?.courseId
    if (!courseId) {
        toast.error('Course Is Not Exists, Please Create Course and Add Lectures')
        navigate('/login')
    }

    const dispatch = useDispatch()
    const { data, role } = useSelector((state) => state.Auth)
    const createrName = data?.fullName


    const [lectureInfo, setLectureInfo] = useState({ title: "", description: "", video: null, youtubeLink: "", createdby: createrName })

    const [previewVideo, setpreviewVideo] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLectureInfo({ ...lectureInfo, [name]: value })
    }

    const handleVideoChange = (e) => {

        const uploadedVideo = e.target.files[0]
        if (uploadedVideo) {

            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedVideo)
            fileReader.addEventListener('load', () => {
                setLectureInfo({ ...lectureInfo, video: uploadedVideo })
                const videoUrl = fileReader.result
                setpreviewVideo(() => videoUrl)
            })
        }
    }

    const handleRemoveVideo = (e) => {
        e.preventDefault()
        setLectureInfo({ ...lectureInfo, video: null, youtubeLink: "" })
        setpreviewVideo(null)
    }

    const handlePrevious = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()


        const { title, video, youtubeLink, createdby } = lectureInfo
        if (!youtubeLink && !video) {
            toast.error("Please Provide Either Video link Or Upload A Video")
            return
        }

        if (!title) {
            toast.error("Topic Is Required!")
            return
        }

        if (!createdby) {
            toast.error("User Not Logged In, Please Login, And Try")
            return
        }

        const formData = new FormData()

        Object.entries(lectureInfo).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const thunkResponse = await dispatch(addLecture({ formData, courseId }))
        if (thunkResponse?.payload?.Data) {

            // Set all inputs to their default values

            setLectureInfo({ title: "", description: "", video: null, youtubeLink: "", createdby: createrName })

            const course = thunkResponse?.payload?.Data?.Course
            navigate('/viewLectures', { state: { course, role } })
        } else {
            return
        }
    }

    return (
        <HomeLayout>
            <div id='course-creation-page' className='mt-18 pb-24 pt-24'>

                <div id="header" className="mb-10 flex items-center justify-center ">
                    <ul className="steps">
                        <li className="step step-primary w-32 md:w-56 ">Create Course</li>
                        <li className="step step-primary w-32 md:w-56">Add Lectures</li>
                        <li className="step  w-32 md:w-56">Publish</li>

                    </ul>
                </div>

                <form onSubmit={handleFormSubmit} className="flex flex-wrap lg:flex-nowrap" >
                    <div id="newCourseInformation" className="mx-7 flex w-full flex-col gap-y-5 md:mx-10 md:min-w-[45%]">

                        <h2 className="text-center text-2xl font-bold">Lecture Information</h2>
                        <label htmlFor="lectureTitle">
                            <p className="mb-1 text-xl font-bold">Topic</p>
                            <input onChange={handleInputChange} type="text" name="title" value={lectureInfo.title} id="lectureTitle" className="h-10 w-full rounded-lg px-5 text-lg" placeholder='e.g. Introduction to Fullstack Web Development' />
                        </label>


                        <label htmlFor="description">
                            <p className="mb-1 text-xl font-bold">Description</p>
                            <textarea onChange={handleInputChange} name="description" value={lectureInfo.description} id="description" className="h-72 w-full resize-none rounded-lg px-6 pt-5 text-[16px]" />
                        </label>

                        <div className="mt-10 flex justify-between md:justify-around">

                            <button onClick={handlePrevious} className="h-12 w-32 rounded-xl bg-yellow-600 font-bold text-white">Previous</button>
                            <button type='submit' className="h-12 w-32 rounded-xl bg-[#4A00FF] font-bold text-white">Save & Next</button>
                        </div>
                    </div>
                    <div id="video-upload-container" className="flex flex-col gap-y-2 px-7 md:w-[50%] md:px-12">
                        <div className='video mt-10 md:mt-0'>
                            <p className="mb-1 text-2xl font-bold">Video</p>
                            <label onContextMenu={(e) => e.preventDefault()} htmlFor="video" className='z-20 inline-block h-[197px] w-[350px] cursor-pointer border-2 border-dashed border-black  md:h-[363px] md:w-[643px]'>

                                {(previewVideo || lectureInfo.youtubeLink.length != 0) ? <ReactPlayer width={'100%'} height={'100%'} url={lectureInfo.youtubeLink.length !== 0 ? lectureInfo.youtubeLink : previewVideo} controls /> : null}
                            </label>
                            <input
                                onChange={(e) => handleVideoChange(e)}
                                accept='.mp4,.avi,.mkv, .wmv,.flv'
                                type="file"
                                name='video'
                                id='video'
                                className='hidden '
                            />

                            <div className='flex items-center justify-center pt-4'><button onClick={handleRemoveVideo}><p >Remove Video</p></button></div>
                        </div>

                        <p className="pt-4 text-center text-xl font-bold">Or</p>

                        <label htmlFor="youtubeLink">
                            <div className="flex items-center gap-x-6"><p className="mb-1 text-xl font-bold">Youtube Link </p></div>
                            <input onChange={handleInputChange} type="url" name="youtubeLink"
                                value={lectureInfo.youtubeLink} id="youtubeLink" className='h-10 w-full rounded-lg px-3 text-lg' placeholder="e.g. https://www.youtube.com/watch?v=LXb3EKWsInQ" />
                        </label>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default AddLecture