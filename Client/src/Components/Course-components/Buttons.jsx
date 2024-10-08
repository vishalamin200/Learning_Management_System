import PropTypes from 'prop-types'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Link } from 'react-router-dom'

export const BackButton = ({ handleBack }) => {
    return (
        <button onClick={handleBack} className='btn-sm  flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-inherit'>
            <GrPrevious />
        </button>
    )
}

export const NextButton = ({ handleNext }) => {
    return (
        <button onClick={handleNext} className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-inherit'>
            <GrNext />
        </button>
    )
}

export const CourseButton = ({ courseName, route, activeCategory }) => {

    const formateName = (str) => str.toLowerCase().split(' ').join('-')

    return (
        <Link to={route}>
            <div className={`flex  h-16 w-fit items-center justify-center rounded-l-full rounded-r-full  ${activeCategory == formateName(courseName) ? "bg-[#4d4f51] text-white " : "bg-[#D1D7DC] text-black"}`}>
                <div className='flex flex-col gap-y-1 px-5'>
                    <p className=' whitespace-pre font-bold ' >
                        {courseName}
                    </p>
                </div>
            </div>
        </Link>
    )
}

CourseButton.propTypes = {
    courseName: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired,
    activeCategory: PropTypes.string
}

BackButton.propTypes = {
    handleBack: PropTypes.func
}
NextButton.propTypes = {
    handleNext: PropTypes.func
}










