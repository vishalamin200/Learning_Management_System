
import { Rating, Stack } from "@mui/material";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseRating from "./CourseRating";


const MyCourseTemplate = ({ course, role, handleUserRating }) => {

    const courseImage = course?.thumbnail?.secure_url
    const courseId = course?._id
    const topic = course?.topic
    const createdBy = course?.createdBy
    const originalPrice = course.price
    const discount = course.discount
    let courseRating = course.rating
    const userRating = course.userRating

    courseRating = 4.5


    const price = (discount) ? Math.trunc(originalPrice - (discount * originalPrice) / 100) : originalPrice

    const [rating, setRating] = useState(userRating)
    const [isFinilised, setIsFinilised] = useState(false)
    const [editRating, seteditRating] = useState(false)

    const changeRating = () => {
        setIsFinilised(true)
        seteditRating(true)
        setTimeout(() => {
            handleUserRating(courseId, rating)
        }, 0)
    }

    const handleShowModal = (e) => {
        e.preventDefault()
        document.getElementById(`rate-course-${courseId}`).showModal()
        setIsFinilised(false)
    }


    const numberOfRating = 3
    const completed = 20

    const ratingString = {
        0.5: 'Worst/Did not like it at all',
        1: 'Awful/Not what i expected at all',
        1.5: 'Awful/Poor',
        2: 'Poor/Pretty disapointed',
        2.5: 'Poor/Average',
        3: 'Average/Could be better',
        3.5: 'Average/Good',
        4: 'Good/What i expected',
        4.5: 'Good/Amazing',
        5: 'Amazing/Above expectation'
    }

    const navigate = useNavigate()
    const handleCourseClick = () => {
        navigate('/viewLectures', { state: { course, role } })
    }

    return (
        <div  id="courseTemplate" className=" relative m-5  h-[21rem] w-72 cursor-pointer rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
            <div onClick={handleCourseClick} id="courseImage" className="inset-2 h-36 w-full  ">
                <img src={courseImage} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
            </div>

            <div id="courseDetails" className="items-base mx-2  flex h-[50%] flex-col">

                <div id="offeredBy" className="mb-2 mt-2 flex items-center gap-x-2 text-sm text-slate-700">{createdBy}</div>
                <p onClick={handleCourseClick} id="courseName" className="mb-3 line-clamp-2 text-[18px] font-bold">{topic}</p>

                {role === 'ADMIN' && <div onClick={handleCourseClick} className="flex items-center gap-x-1"><p>{courseRating}</p><CourseRating averageRating={courseRating} /> <p className="text-sm">({numberOfRating})</p></div>}

                {role === 'USER' && <div id="progrss-and-rating" className=" mt-3 flex w-full  flex-col justify-center gap-y-1">
                    <progress className="progress progress-primary w-full" value={completed} max={100} />

                    <div className="mt-1 flex justify-between">
                        <p>{completed}% completed</p>
                        <div onClick={handleShowModal} className="flex flex-col items-end justify-end gap-x-2  ">
                            <Stack spacing={1}>
                                <Rating name="half-rating-read" value={userRating} precision={0.5} size='small' readOnly />
                            </Stack>
                            <p  className="text-xs hover:underline z-20">{editRating ? 'Edit rating' : "Leave a rating"}</p>
                        </div>
                    </div>

                </div>}

                {role === 'ADMIN' && <div id="price" className="mt-2  flex items-center gap-x-2 text-base">
                    <p id="type" className=" flex items-center  text-[#4790f6]">
                        {price == 0 || price == undefined ? "Free" : `₹${price}`}

                    </p>
                    {!(price == 0 || price == undefined) && <p className="text-slate-700 line-through">₹{originalPrice}</p>}
                </div>}
            </div>


            <dialog id={`rate-course-${courseId}`} className="modal">
                <div className="modal-box  flex h-60 flex-col items-center justify-center">
                    <form method="dialog" action="">
                        <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
                    </form>
                    <h2 className="text-2xl font-bold">How Would You Rate This Course</h2>
                    <p>{ratingString[rating] ? ratingString[rating] : 'Select Rating'}</p>
                    <div className="mt-12 flex items-center justify-center">

                        <Stack spacing={1} className="">
                            <Rating name="half-rating-read" precision={0.5} size='large' className=" scale-150" value={userRating}

                                onChangeActive={isFinilised ? null : (e, newHoverValue) => setRating(newHoverValue)}

                                onChange={changeRating} />
                        </Stack>
                    </div>
                </div>
            </dialog>
        </div>
    )
}


MyCourseTemplate.propTypes = {
    course: PropTypes.object,
    role: PropTypes.string,
    handleUserRating: PropTypes.func

};


export default MyCourseTemplate