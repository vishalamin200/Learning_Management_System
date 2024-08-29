import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import EmptyState from '../../assets/Logos/emptystate.svg'
import { BackButton, NextButton } from '../../Components/Course-components/Buttons'
import CoursesCarousel from '../../Components/Course-components/CoursesCarousel'
import CourseTemplate from "../../Components/Course-components/CourseTemplate"
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchCourseByCategory } from '../../Redux/CourseSlice'


const CourseCategory = () => {

    const { category } = useParams()
    const formattedName = category.replace(/-/, " ").replace(/\b\w/g, char => char.toUpperCase());

    const dispatch = useDispatch()
    const [courses, setCourses] = useState([{ topic: "", }])


    useEffect(() => {
        const fetchCourses = async () => {
            if (category) {
                const thunkResponse = await dispatch(fetchCourseByCategory({ category }))
                const courses = thunkResponse?.payload?.Data?.Course
                if (courses != undefined) {
                    if (courses.length > 0) {
                        setCourses(() => courses);
                    }
                } else {
                    setCourses([])
                }
            }
        };

        fetchCourses();
    }, [category]); // Ensure category is a dependency


    return (
        <HomeLayout>
            <div id="coursePage" className="mx-24 mt-16 flex flex-col">

                <CoursesCarousel />

                <p className="ml-5 pb-8 pt-10 text-4xl font-bold">{formattedName} Courses</p>
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
                        courses.map((course) => <CourseTemplate key={course?._id} course={course}  />)
                    }
                    {
                        (courses.length == 0) && <div className='relative mb-28 flex h-[100%] w-full flex-col items-center justify-center'><img src={EmptyState} alt="Empty Page" className='w-[72%]' />
                            <p className='text-base'>No Course Available For This Section</p>
                        </div>
                    }
                </div>

                {!(courses.length == 0) && <div className='mb-8 mr-8 mt-5 flex items-center justify-end gap-x-5'>
                    <BackButton />
                    <p className='text-xl'>1</p>
                    <NextButton />
                </div>}

            </div>
        </HomeLayout>
    )
}

export default CourseCategory