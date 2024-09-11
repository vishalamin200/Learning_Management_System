import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import EmptyState from '../../assets/Logos/emptystate.svg'
import { BackButton, NextButton } from '../../Components/Course-components/Buttons'
import MyCourseTemplate from '../../Components/Course-components/MyCourseTemplate'
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchAllCourses, fetchCreatedCourses, fetchSubscribedCourses, updateCourseRating } from '../../Redux/CourseSlice.js'

const MyCourses = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([])
    const [coursePage, setCoursePage] = useState(1)
    const [courses, setCourses] = useState([])


    const { role, data } = useSelector((state) => state.Auth)
    const userId = data?._id

    useEffect(() => {
        const fetchCourses = async () => {
            const thunkResponse = role === 'ADMIN' ? await dispatch(fetchAllCourses()) : role === 'INSTRUCTOR'  ? await dispatch(fetchCreatedCourses())  : await dispatch(fetchSubscribedCourses())

            const courses = thunkResponse?.payload?.Data
            

            if (courses != undefined && courses.length > 0) {
                setAllCourses(courses.map((course) => ({ ...course, userRating: course.allRatings.find((rating) => rating?.userId?.toString() == userId)?.value || 0 })))
            } else {
                setAllCourses(() => [])
            }
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        allCourses ? setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8)) : null
    }, [coursePage, allCourses])


    const handleUserRating = (courseId, newUserRating) => {
        setCourses(courses.map((course) => course._id === courseId ? { ...course, userRating: newUserRating } : course))


        setTimeout(async () => {
            const thunkResponse = await dispatch(updateCourseRating({ userRating: newUserRating, courseId }))
            if (!thunkResponse?.payload?.Success) {
                toast.error(thunkResponse?.payload?.Message)
            }
        }, 0)
    }

    const handleNextButton = () => {
        if (Math.ceil(allCourses?.length / 8) > coursePage) {
            setCoursePage(coursePage + 1)
        }
    }
    const handleBackButton = () => {
        if (coursePage > 1) {
            setCoursePage(coursePage - 1)
        }
    }



    return (
        <HomeLayout>
            <div className='min-h-[94vh] pt-16 md:min-h-[90vh]   md:px-20'>
                <div id='header' className='mx-5 flex flex-wrap justify-between   text-2xl font-bold md:pt-6'>

                    <p className='my-6 underline'>My Courses</p>

                    {(role === 'ADMIN' || role === 'INSTRUCTOR' ) && <button onClick={() => navigate('/createCourse')} className="btn btn-primary btn-md mt-5 text-white hover:bg-blue-700">Create New Course</button>}

                </div>
                <div id="courses" className="flex   flex-wrap justify-center md:scale-100 md:justify-start">

                    {
                        courses.map((course) => <MyCourseTemplate key={course?.topic} course={course} role={role} handleUserRating={handleUserRating} />)
                    }
                    {
                        (courses.length == 0) && <div className='relative flex h-[100%] w-full flex-col items-center justify-center md:mb-60'>

                            <img src={EmptyState} alt="Empty Page" className='mt-44 w-[72%] md:mt-24' />
                            <p className='text-base'>You have not subscribed any course</p>
                        </div>
                    }
                </div>

                {!(courses.length == 0) && <div className='mb-8 mr-8 mt-5 flex items-center justify-end gap-x-5'>
                    <BackButton handleBack={handleBackButton} />
                    <p className='text-xl'>{coursePage}</p>
                    <NextButton handleNext={handleNextButton} />
                </div>}
            </div>
        </HomeLayout>

    )
}

export default MyCourses