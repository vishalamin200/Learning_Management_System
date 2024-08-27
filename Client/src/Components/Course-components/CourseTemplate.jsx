import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"

import CourseRating from "./CourseRating"

const CourseTemplate = ({ course }) => {

    const courseImage = course?.thumbnail?.secure_url
    const topic = course?.topic
    const createdBy = course?.createdBy
    const originalPrice = course?.price
    const discount = course?.discount
 
    const price = (discount) ? Math.trunc(originalPrice - (discount * originalPrice) / 100) : originalPrice

    const averageRating = 4.2
    const numberOfRating = 3

    const navigate = useNavigate()

    const handleCourseClick = () => {
        navigate('/courseDetail', { state: { course } })
    }

    return (
        <div onClick={handleCourseClick} id="courseTemplate" className=" relative m-5 h-[21rem] w-72 cursor-pointer rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
            <div id="courseImage" className="inset-2 h-36 w-full  ">

                <img src={courseImage} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
            </div>
            <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col">

                <div id="offeredBy" className="mb-2 mt-2 flex items-center gap-x-2 text-sm text-slate-700">{createdBy}</div>
                <p id="courseName" className="mb-3 line-clamp-2 text-[18px] font-bold">{topic}</p>

                <div className="flex items-center gap-x-1"><p>{averageRating}</p><CourseRating averageRating={averageRating} /> <p className="text-sm">({numberOfRating})</p></div>

                <div id="price" className="mt-2  flex items-center gap-x-2 text-base">
                    <p id="type" className=" flex items-center  text-[#4790f6]">
                        {price == 0 || price == undefined ? "Free" : `₹${price}`}

                    </p>
                    {!(price == 0 || price == undefined) && <p className="text-slate-700 line-through">₹{originalPrice}</p>}
                </div>
            </div>
        </div>
    )
}

CourseTemplate.propTypes = {
    course: PropTypes.object

}



export default CourseTemplate