import DOMPurify from 'dompurify'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import BreadCrumbs from '../../Components/Course-components/BreadCrumbs'
import CourseIntroduction from '../../Components/Course-components/CourseIntroduction'
import HomeLayout from '../../Layouts/HomeLayout'



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

    //purify the description html, as it may content vunerable html too.
    const sanitizedDescription = DOMPurify.sanitize(description)

    const lastUpdateDate = course?.updatedAt ? new Date(course?.updatedAt) : null

    const lastUpdate = lastUpdateDate ? lastUpdateDate?.toLocaleDateString('en-GB', { 'day': '2-digit', 'month': 'short', 'year': 'numeric' }) : "Not Available"

    const price = Math.trunc(discount ? originalPrice - (discount * originalPrice) / 100 : originalPrice)

    const navigate = useNavigate()


    const handleEditCourse = (e) => {
        e.preventDefault()
        if (role === 'ADMIN') {
            navigate('/my-courses/edit-course', { state: { course } })
        }
    }

    const handleViewCourse = (e) => {
        e.preventDefault()
        navigate('/viewLectures', { state: { course, role } })
    }


    const handleCoursePayment = (e) => {
        e.preventDefault()
        navigate('/course/checkout', { state: { role, data, course } })
        
    }

    return (
        <HomeLayout>
            <div id="course-detail-page" className=" h-fit w-full pt-16">

                <div id='header' className="h-fit w-full bg-[#1B2124] px-20 pb-16 pt-8 text-white">
                    <BreadCrumbs
                        secondLast={{ path: '/category', name: 'Category' }}
                        last={{ path: '/course/all-courses', name: 'Courses' }}
                        current="Course Details"
                    />

                    <div className='flex justify-between'>
                        <div id="courseTitle" className='flex max-w-[60%] flex-col flex-wrap gap-y-8  '><p className='text-3xl font-bold'>{courseTitle}</p>

                            <CourseIntroduction category={category} />


                            <div id="price" className="mt-2 flex items-center gap-x-3 text-2xl ">
                                <p id="type" className=" flex items-center  text-white">
                                    {price == 0 || price == undefined ? "Free" : `₹${price}`}

                                </p>
                                {!(price == 0 || price == undefined) && (<div className="flex gap-x-5"><p className='text-white line-through'>₹{originalPrice}</p>

                                    <p className=' text-[#95BE8A]'>{discount}% Discount</p>
                                </div>
                                )
                                }

                            </div>

                            <div id="buttons" className="flex gap-x-5">
                                {role === 'ADMIN' && (<button onClick={handleViewCourse} className="btn mt-3  w-48 bg-slate-700 hover:bg-slate-800">
                                    <p className="text-lg text-white ">
                                        View Course
                                    </p>
                                </button>)
                                }

                                {role === 'ADMIN' ? <button onClick={handleEditCourse} className="btn mt-3  w-48 bg-[#E97862] hover:bg-[#e7644a]">
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


                        <div id="courseImage " className='flex flex-col'><img src={courseImage} alt="course-image" className='h-68 w-96 rounded-lg' />
                        </div>
                    </div>
                </div>
                <div id="extraInfomation" className="flex w-full flex-wrap justify-between gap-x-28 px-20 pb-5 pt-5 text-center shadow-md">
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Rating</p>
                        <p className="text-lg ">{course?.rating}</p>
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Instructor</p>
                        <p className="text-lg">{course?.createdBy}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Language</p>
                        <p className="text-lg">{course?.language}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Course Level</p>
                        <p className="text-lg">{course?.level}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">No. Of Lectures</p>
                        <p className="text-lg">{course?.noOfLectures}</p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Last Update</p>
                        <p className="text-lg">{lastUpdate}</p>
                    </div>
                </div>
                <div id="AboutCourse" className="mx-20 mb-28 mt-20 flex h-fit w-full flex-col gap-y-7 pb-12 md:w-[60%] ">


                    <div className='flex h-12 items-center gap-x-8'>
                        <div className="h-full w-2 border-2 border-r-2 border-[#E97862] bg-[#E97862]"></div>
                        <p className='text-2xl font-bold '>About {courseTitle}</p>
                    </div>

                    <div className='text-base' dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                </div>
            </div>

        </HomeLayout>
    )
}

export default CourseDetailPage