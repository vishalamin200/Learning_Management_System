import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import EmptyState from '../../assets/Logos/emptystate.svg'
import { BackButton, NextButton } from '../../Components/Course-components/Buttons'
import CoursesCarousel from '../../Components/Course-components/CoursesCarousel'
import CourseTemplate from "../../Components/Course-components/CourseTemplate"
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchAllCourses } from '../../Redux/CourseSlice'


const AllCoursesPage = () => {

    const dispatch = useDispatch()
    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const thunkResponse = await dispatch(fetchAllCourses())
            const courses = thunkResponse?.payload?.Data?.Courses

            if (courses != undefined && courses.length > 0) {
                setCourses(courses)
            } else {
                setCourses(() => [])
            }
        }
        fetchCourses()
    }, [])

    return (
        <HomeLayout>
            <div id="coursePage" className="mx-24 mt-16 flex flex-col">

                <div className="ml-5">
                    <h1 className='pb-2 pt-20 text-4xl font-bold'>All the skills you need in one place</h1>
                    <p className='text-base '>From critical skills to technical topics, We supports your proffessional development.</p>
                </div>

                <CoursesCarousel />

                <p className="ml-5 pb-8 pt-10 text-4xl font-bold">Explore All Courses</p>
                <div className="ml-5">
                    <p className="mb-1 text-2xl font-bold">Courses to get you started</p>
                    <p className="mb-6 text-base">Explore courses form experienced, real-world experts</p>
                    <div className="mb-1 flex gap-x-4">
                        <span>Most popular</span>
                        <span>New</span>
                        <span>Tranding</span>
                    </div>
                    <hr className="w-full font-bold" />
                </div>

                <div id="courses" className="flex flex-wrap">
                    {
                        courses.map((course) => <CourseTemplate key={course?._id} course={course} />)
                    }
                    {
                        (courses.length == 0) && <div className='relative mb-28 flex h-[100%] w-full flex-col items-center justify-center'><img src={EmptyState} alt="Empty Page" className='w-[72%]' />
                            <p className='text-base'>No Course Available For This Section</p>
                        </div>
                    }

                </div>
                <div className='mb-8 mr-8 mt-5 flex items-center justify-end gap-x-5'>
                    <BackButton />
                    <p className='text-xl'>1</p>
                    <NextButton />
                </div>

            </div>
        </HomeLayout>
    )
}

export default AllCoursesPage