import DOMPurify from 'dompurify'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import BreadCrumbs from '../../Components/Course-components/BreadCrumbs'
import CourseIntroduction from '../../Components/Course-components/CourseIntroduction'
import HomeLayout from '../../Layouts/HomeLayout'
import toast from 'react-hot-toast'



const CourseDetailPage = () => {
    const location = useLocation()
    const course = location?.state?.course
    const { role, data } = useSelector((state) => state.Auth)


    const courseTitle = course?.topic
    const courseImage = course?.thumbnail?.secure_url
    const category = course?.category
    const description = course?.description
    const originalPrice = course?.price
    const discount = course?.discount
    const creatorEmail = course?.creatorEmail

    //purify the description html, as it may content vunerable html too.
    const sanitizedDescription = DOMPurify.sanitize(description)

    const lastUpdateDate = course?.updatedAt ? new Date(course?.updatedAt) : null

    const lastUpdate = lastUpdateDate ? lastUpdateDate?.toLocaleDateString('en-GB', { 'day': '2-digit', 'month': 'short', 'year': 'numeric' }) : "Not Available"

    const price = Math.trunc(discount ? originalPrice - (discount * originalPrice) / 100 : originalPrice)

    const navigate = useNavigate()


    const handleEditCourse = (e) => {
        e.preventDefault()
        if (role === 'ADMIN' || role === 'INSTRUCTOR') {
            navigate('/my-courses/edit-course', { state: { course } })
        }
    }

    const handleViewCourse = (e) => {
        e.preventDefault()
        navigate('/viewLectures', { state: { course, role } })
    }


    const handleCoursePayment = (e) => {
        e.preventDefault()
        if(role === 'ADMIN'){
            toast.error("Admin Can't Purchase A Course")
            return 
        }

        if(role === 'INSTRUCTOR'){
            toast.error("Instructor Can't Purchase A Course")
            return 
        }
        navigate('/course/checkout', { state: { role, data, course } })

    }

    return (
        <HomeLayout>
            <div id="course-detail-page" className=" h-fit  w-full pt-12 md:pt-16">

                <div id='header' className="h-fit w-full bg-[#1B2124] px-5 pb-16 pt-8 text-white md:px-20">
                    <BreadCrumbs
                        secondLast={{ path: '/category', name: 'Category' }}
                        last={{ path: '/course/all-courses', name: 'Courses' }}
                        current="Course Details"
                    />

                    <div id="courseImageForMobile " className='flex flex-col items-center justify-center md:hidden'><img src={courseImage} alt="course-image" className='h-68 w-96  rounded-lg' />
                    </div>

                    <div className='flex justify-between'>
                        <div id="courseTitle" className='flex flex-col flex-wrap gap-y-8 pt-5 md:max-w-[60%]  '><p className='text-3xl font-bold'>{courseTitle}</p>

                            <CourseIntroduction category={category} />


                            <div id="price" className="mt-2 flex items-center gap-x-3 text-2xl ">
                                <p id="type" className=" flex items-center  text-white">
                                    {price == 0 || price == undefined ? "Free" : `₹${price}`}
                                </p>
                                {!(price == 0 || price == undefined) && (<div className="flex gap-x-5"><p className='text-white line-through'>₹{originalPrice}</p>

                                    <p className=' text-[#95BE8A]'>{discount}% Discount</p>
                                </div>
                                )}
                            </div>

                            <div id="buttons" className="flex gap-x-8">
                                {((role === 'INSTRUCTOR' && data?.email === creatorEmail) || role === 'ADMIN') && (<button onClick={handleViewCourse} className="btn mt-3  w-40 bg-slate-700 hover:bg-slate-800">
                                    <p className="text-lg text-white ">
                                        View Course
                                    </p>
                                </button>)
                                }

                                {((role === 'INSTRUCTOR' && data?.email === creatorEmail) || role === 'ADMIN') ? <button onClick={handleEditCourse} className="btn mt-3  w-40 bg-[#E97862] hover:bg-[#e7644a]">
                                    <p className="text-lg text-white ">
                                        Edit Course
                                    </p>
                                </button> :

                                    <button onClick={handleCoursePayment} className="btn mt-3  w-48 bg-[#E97862] hover:bg-[#e7644a]">
                                        <p className="text-lg text-white ">
                                            {price === 0 ? "Enroll Now" : "Buy Now"}
                                        </p>
                                    </button>}
                            </div>
                        </div>


                        <div id="courseImage " className=' hidden flex-col pt-5 md:flex'><img src={courseImage} alt="course-image" className='h-68 w-96 rounded-lg' />
                        </div>
                    </div>
                </div>
                <div id="extraInfomation" className="flex w-full flex-wrap justify-between gap-x-8 gap-y-5 px-5 py-5 text-center shadow-md md:gap-x-28 md:gap-y-0 md:px-20">
                    <div className="flex flex-col gap-y-3">
                        <p className="font-bold md:text-xl">Rating</p>
                        <p className="md:text-lg ">{course?.rating}</p>
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <p className="font-bold md:text-xl">Instructor</p>
                        <p className="md:text-lg">{course?.createdBy}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="font-bold md:text-xl">Language</p>
                        <p className="md:text-lg">{course?.language}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="font-bold md:text-xl">Course Level</p>
                        <p className="md:text-lg">{course?.level}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="font-bold md:text-xl">No. Of Lectures</p>
                        <p className="md:text-lg">{course?.noOfLectures}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="font-bold md:text-xl">Last Update</p>
                        <p className="md:text-lg">{lastUpdate}</p>
                    </div>
                </div>
                <div id="AboutCourse" className=" mx-5 mb-28 mt-8 flex h-fit flex-col gap-y-7 pb-12 md:mx-20 md:mt-16 md:w-[60%]  ">


                    <div className='flex h-fit items-center gap-x-5  md:h-12 md:gap-x-8'>
                        <div className="h-12 w-2 border-2 border-r-2 border-[#E97862] bg-[#E97862]"></div>
                        <p className='text-2xl font-bold '>About {courseTitle}</p>
                    </div>

                    <div className='text-base' dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                </div>
            </div>

        </HomeLayout>
    )
}

export default CourseDetailPage