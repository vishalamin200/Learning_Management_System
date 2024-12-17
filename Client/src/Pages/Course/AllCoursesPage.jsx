import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import EmptyState from '../../assets/Logos/emptystate.svg'
import { BackButton, NextButton } from '../../Components/Course-components/Buttons'
import CoursesCarousel from '../../Components/Course-components/CoursesCarousel'
import CourseTemplate from "../../Components/Course-components/CourseTemplate"
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchAllCourses, setActiveButton, setAllCourses, setCoursePage, setCourses, setMostPopularCourses, setNewCourses, setTopRatedCourses } from '../../Redux/CourseSlice'


const AllCoursesPage = () => {

    const dispatch = useDispatch()
    const { allCourses, coursePage, courses, activeButton } = useSelector((state) => state.Course)

    useEffect(() => {
        const fetchCourses = async () => {
            const thunkResponse = await dispatch(fetchAllCourses())
            const courses = thunkResponse?.payload?.Data

            if (courses != undefined && courses.length > 0) {
                dispatch(setAllCourses(courses))
            } else {
                dispatch(setCourses(() => []))
            }
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        allCourses ? dispatch(setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8))) : null
    }, [allCourses, coursePage,dispatch])

    const handleNextButton = () => {
        if (Math.ceil(allCourses?.length / 8) > coursePage) {
            dispatch(setCoursePage(coursePage + 1))
        }
    }
    const handleBackButton = () => {
        if (coursePage > 1) {
            dispatch(setCoursePage(coursePage - 1))
        }
    }

    const handleMostPopular = (e) => {
        dispatch(setActiveButton(e.target.name))
        dispatch(setMostPopularCourses())
        allCourses ? dispatch(setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8))) : null
    }

    const handleTopRated = (e) => {
        dispatch(setActiveButton(e.target.name))
        dispatch(setTopRatedCourses())
        allCourses ? dispatch(setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8))) : null
    }

    const handleNew = (e) => {
        dispatch(setActiveButton(e.target.name))
        dispatch(setNewCourses())
        allCourses ? dispatch(setCourses(allCourses.slice((coursePage - 1) * 8, coursePage * 8))) : null
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
                        courses.length >0 ? courses?.map((course) => <CourseTemplate key={course?._id} course={course} />) : ""
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