import { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import EmptyState from '../../assets/Logos/emptystate.svg'
import CoursesCarousel from '../../Components/Course-components/CoursesCarousel'
import CourseTemplate from "../../Components/Course-components/CourseTemplate"
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchCourseByCategory, setCourses } from '../../Redux/CourseSlice'


const CourseCategory = () => {

    const { category } = useParams()
    const formattedName = category?.replace(/-/, " ").replace(/\b\w/g, char => char.toUpperCase());

    const dispatch = useDispatch()
    const { courses } = useSelector(state => state?.Course)

    const [showLeft, setShowLift] = useState(false)
    const [showRight, setShowRight] = useState(true);

    const courseCarouselRef = useRef()

    const checkBottonVisibility = () => {
        if (!courseCarouselRef) return;

        const { scrollLeft, scrollWidth, clientWidth } = courseCarouselRef.current


        setShowLift(scrollLeft > 25)
        setShowRight(scrollLeft + clientWidth < scrollWidth - 5)
    }

    const handleLeftScroll = () => {

        const carousel = courseCarouselRef.current
        if (!carousel) return

        carousel.scrollBy({ left: -800, bahaviour: 'smooth' })
    }

    const handleRightScroll = () => {

        const carousel = courseCarouselRef.current
        if (!carousel) return

        carousel.scrollBy({ left: 800, bahaviour: 'smooth' })
    }

    useEffect(() => {
        if (!courseCarouselRef) return
        checkBottonVisibility()

        const carousel = courseCarouselRef.current

        if (!carousel) return

        carousel.addEventListener("scroll", checkBottonVisibility)

        return () => {
            carousel.removeEventListener("scroll", checkBottonVisibility)
        }

    }, [])


    useEffect(() => {
        const fetchCourses = async () => {
            if (category) {
                const thunkResponse = await dispatch(fetchCourseByCategory({ category }))
                const courses = thunkResponse?.payload?.Data?.Course
                if (courses != undefined) {
                    if (courses.length > 0) {
                        dispatch(setCourses(courses));
                    }
                } else {
                    dispatch(setCourses([]))
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
                <div className='relative w-full'>

                    {
                        (courses?.length > 0 && showLeft) && <button onClick={handleLeftScroll} className='absolute -left-6 top-[10rem] z-20  hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300  bg-white hover:bg-[#D1D7DC] md:flex'>
                            <FaAngleLeft size={24} />
                        </button>
                    }


                    <div id="courses" ref={courseCarouselRef} className="carousel carousel-start relative flex  w-full flex-nowrap">

                        {
                            courses?.length > 0 ? courses?.map((course) => <div key={course?._id} className='carousel-item'><CourseTemplate course={course} /></div>) : ""
                        }

                        {
                            (courses == null || courses?.length == 0) && <div className='relative my-16 flex  h-[100%] w-full flex-col items-center justify-center md:mb-20 md:mt-20'><img src={EmptyState} alt="Empty Page" className='w-[72%]' />
                                <p className='text-base'>No Course Available For This Section</p>
                            </div>
                        }
                    </div>


                    {
                        (courses?.length > 0 && showRight) && <button onClick={handleRightScroll} className='absolute -right-6 top-[10rem] z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300  bg-white hover:bg-[#D1D7DC] md:flex'>
                            <FaAngleRight size={24} className='hover:color-white' />
                        </button>
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseCategory