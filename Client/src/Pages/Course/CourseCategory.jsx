import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import EmptyState from '../../assets/Logos/emptystate.svg'
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
            <div id="coursePage" className="mx-3 mb-16 flex flex-col pt-16 md:mx-24">

                <CoursesCarousel activeCategory={category} />

                <p className="ml-5 pb-8 pt-10 text-4xl font-bold">{formattedName} Courses</p>
                <div className="ml-5">
                    <p className="mb-1 text-2xl font-bold">Courses to get you started</p>
                    <p className="mb-6 text-base">Explore courses form experienced, real-world experts</p>
                    <div className="mb-1 flex gap-x-4">
                        <span>Most popular</span>
                        <span>New</span>
                        <span>Trending</span>
                    </div>
                    <hr className="w-full font-bold" />
                </div>
                <div id="courses" className="carousel carousel-start flex w-full  flex-nowrap">
                    {
                        courses.map((course) => <div key={course?._id} className='carousel-item'><CourseTemplate course={course} /></div>)
                    }
                    {
                        (courses.length == 0) && <div className='relative my-16 flex  h-[100%] w-full flex-col items-center justify-center md:mb-20 md:mt-20'><img src={EmptyState} alt="Empty Page" className='w-[72%]' />
                            <p className='text-base'>No Course Available For This Section</p>
                        </div>
                    }
                </div>

            </div>
        </HomeLayout>
    )
}

export default CourseCategory