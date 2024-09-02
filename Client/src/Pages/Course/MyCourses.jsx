import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import EmptyState from '../../assets/Logos/emptystate.svg'
import { BackButton, NextButton } from '../../Components/Course-components/Buttons'
import MyCourseTemplate from '../../Components/Course-components/MyCourseTemplate'
import HomeLayout from '../../Layouts/HomeLayout'
import {fetchSubscribedCourses} from '../../Redux/CourseSlice.js'

const MyCourses = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [allCourses, setAllCourses] = useState([])
    const [coursePage, setCoursePage] = useState(1)
    const [courses, setCourses] = useState([])


    const { role } = useSelector((state) => state.Auth)

    useEffect(() => {
        const fetchCourses = async () => {
            const thunkResponse = await dispatch(fetchSubscribedCourses())
             const courses = thunkResponse?.payload?.Data

            if (courses != undefined && courses.length > 0) {
                setAllCourses(courses.map((course) => ({ ...course, userRating: 0 })))
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
            <div className='mx-20 mt-20'>
                <div id='header' className='mx-5 flex flex-wrap justify-between  pt-12 text-2xl font-bold'>

                    <p className='underline'>My Courses</p>

                    {role === 'ADMIN' && <button onClick={() => navigate('/createCourse')} className="btn btn-primary btn-md text-white hover:bg-blue-700">Create New Course</button>}

                </div>
                <div id="courses" className="flex flex-wrap">

                    {
                        courses.map((course) => <MyCourseTemplate key={course?.topic} course={course} role={role} handleUserRating={handleUserRating} />)
                    }
                    {
                        (courses.length == 0) && <div className='relative mb-28 flex h-[100%] w-full flex-col items-center justify-center'><img src={EmptyState} alt="Empty Page" className='w-[72%]' />
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