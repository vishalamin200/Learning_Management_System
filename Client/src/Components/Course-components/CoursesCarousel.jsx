import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'

import { CourseButton } from "./Buttons"


const CoursesCarousel = ({ activeCategory = 'all-courses' }) => {
    const courseList = ['All Courses', 'Web Development', 'Data Science', 'Machine Learning', 'Generative Ai', "BlockChain", 'Cloud Computing', 'Data Structures', 'MySql', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'UI/UX', 'C++']

    const [showLeft, setShowLift] = useState(false)
    const [showRight, setShowRight] = useState(true);

    const carouselRef = useRef()

    const checkBottonVisibility = () => {
        if (!carouselRef) return;

        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current


        setShowLift(scrollLeft > 25)
        setShowRight(scrollLeft + clientWidth < scrollWidth - 25)
    }

    const handleLeftScroll = () => {

        const carousel = carouselRef.current
        if (!carousel) return

        carousel.scrollBy({ left: -600, bahaviour: 'smooth' })
    }

    const handleRightScroll = () => {

        const carousel = carouselRef.current
        if (!carousel) return

        carousel.scrollBy({ left: 600, bahaviour: 'smooth' })
    }

    useEffect(() => {
        if (!carouselRef) return
        checkBottonVisibility()

        const carousel = carouselRef.current

        if (!carousel) return

        carousel.addEventListener("scroll", checkBottonVisibility)

        return () => {
            carousel.removeEventListener("scroll", checkBottonVisibility)
        }

    }, [])




    return (
        <div className='no-wrap relative flex min-w-full'>
            
            {showLeft && <button onClick={handleLeftScroll} className='absolute -left-2 top-14 hidden  h-12 w-12 items-center justify-center rounded-full border border-gray-300  bg-white hover:bg-[#D1D7DC] md:flex'>
                <FaAngleLeft size={24} />
            </button>}

            <div ref={carouselRef} id='courseCarousel' className=' carousel carousel-start ml-4  mt-8 flex max-w-full flex-nowrap  gap-x-7 md:mt-12'>
                {courseList.map((courseName) => (
                    <CourseButton
                        key={courseName}
                        courseName={courseName}
                        route={`/course/${courseName.trim().replace(/[\s/]+/g, '-').toLowerCase()}`}
                        activeCategory={activeCategory}
                    />
                ))}
            </div>
            {showRight && <button onClick={handleRightScroll} className='absolute -right-6 top-14 hidden h-12 w-12 items-center justify-center rounded-full border border-gray-300   bg-white hover:bg-[#D1D7DC] md:flex'>
                <FaAngleRight size={24} className='hover:color-white' />
            </button>}


        </div>
    )
}

CoursesCarousel.propTypes = {
    activeCategory: PropTypes.string
}

export default CoursesCarousel