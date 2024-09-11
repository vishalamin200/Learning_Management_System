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
    const [allCourses, setAllCourses] = useState([])

    const [coursePage, setCoursePage] = useState(1)
    const [courses, setCourses] = useState([])
    const [activeButton, setActiveButton] = useState()


    useEffect(() => {
        const fetchCourses = async () => {
            const thunkResponse = await dispatch(fetchAllCourses())
            const courses = thunkResponse?.payload?.Data

            if (courses != undefined && courses.length > 0) {
                setAllCourses(courses)
            } else {
                setCourses(() => [])
            }
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        allCourses ? setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8)) : null
    }, [allCourses, coursePage,])

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

    const handleMostPopular = (e) => {
        setActiveButton(e.target.name)
        const getTotalRatings = (course) => {
            return course?.allRatings.reduce((sum, rating) => sum += rating.value, 0)
        }

        const mostPopularCourses = allCourses.sort((first, second) => {
            const firstTotalRatings = getTotalRatings(first)
            const secondTotalRatings = getTotalRatings(second)
            return secondTotalRatings - firstTotalRatings
        })

        setAllCourses(mostPopularCourses)
        allCourses ? setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8)) : null
    }

    const handleTopRated = (e) => {
        setActiveButton(e.target.name)
        const topRatedCourses = allCourses.sort((a, b) => {
            if (b.rating === a.rating) {
                return b.noOfRatings - a.noOfRatings; // If ratings are equal, prioritize by number of ratings
            }
            return b.rating - a.rating; // Otherwise, sort by rating
        });


        setAllCourses(topRatedCourses)
        allCourses ? setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8)) : null
    }

    const handleNew = (e) => {
        setActiveButton(e.target.name)
        const newCourses = allCourses.sort((first, second) => {
            return new Date(second.createdAt) - new Date(first.createdAt)
        })

        setAllCourses(newCourses)
        allCourses ? setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8)) : null
    }




    return (
        <HomeLayout>
            <div id="coursePage" className="mx-3 flex flex-col pt-16 md:mx-24  lg:pt-5">

                <div className="ml-5">
                    <h1 className='pb-8 pt-8 text-4xl font-bold md:pb-2 md:pt-20 '>All the skills you need in one place</h1>
                    <p className='text-base '>From critical skills to technical topics, We supports your proffessional development.</p>
                </div>

                <CoursesCarousel />

                <p className="ml-5 pb-8 pt-10 text-4xl font-bold">Explore All Courses</p>
                <div className="ml-5">

                    <p className="mb-1 text-2xl font-bold">Courses to get you started</p>
                    <p className="mb-6 text-base">Explore courses form experienced, real-world experts</p>

                    <div className="mb-1 flex gap-x-4">

                        <button onClick={handleMostPopular} name='mostPopular' className={`${activeButton == 'mostPopular' && 'font-bold'}`} >Most popular</button>

                        <button onClick={handleNew} name='new' className={`${activeButton == 'new' && 'font-bold'}`} >New</button>

                        <button onClick={handleTopRated} name='topRated' className={`${activeButton == 'topRated' && 'font-bold'}`} >Top Rated</button>

                    </div>
                    <hr className="w-full font-bold" />
                </div>

                <div id="courses" className="flex flex-wrap justify-center md:justify-between">
                    {
                        courses.map((course) => <CourseTemplate key={course?._id} course={course} />)
                    }
                    {
                        (courses.length == 0) && <div className='relative my-24 flex h-[100%] w-full flex-col items-center justify-center md:mb-28 md:mt-16'><img src={EmptyState} alt="Empty Page" className='w-[72%]' />
                            <p className='text-base'>No Course Available For This Section</p>
                        </div>
                    }
                </div>

                {(courses.length > 0) && <div className='mb-8 mr-8 mt-5 flex items-center justify-end gap-x-5 '>
                    <BackButton handleBack={handleBackButton} />
                    <p className='text-xl'>{coursePage}</p>
                    <NextButton handleNext={handleNextButton} />
                </div>}


            </div>
        </HomeLayout>
    )
}

export default AllCoursesPage