import { CourseButton } from "./Buttons"


const CoursesCarousel = () => {
    const courseList = ['All Courses','Web Development', 'Data Science', 'Machine Learning', 'Generative Ai',"BlockChain", 'Cloud Computing', 'Data Structures','MySql', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'UI/UX', 'C++']
    
    
    return (

        <div id='courseCarousel' className=' carousel carousel-start  mt-12 flex max-w-full flex-nowrap gap-x-7 px-5'>
            {courseList.map((courseName) => (
                <CourseButton
                    key={courseName}
                    courseName={courseName}
                    route={`/course/${courseName.trim().replace(/[\s/]+/g, '-').toLowerCase()}`}
                />
            ))}
        </div>

    )
}

export default CoursesCarousel