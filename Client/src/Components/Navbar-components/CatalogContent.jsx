import PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom"


const CatalogContent = ({ isActive }) => {

    const navigate = useNavigate()

    const courseList = ['Web Development', 'Data Science', 'Machine Learning', 'MySql', 'Cloud Computing', 'BlockChain', 'Data Structures', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'UI/UX', 'C++']

    return (

        <div id="catalogContext" className={`absolute left-40 top-[9vh] z-40 flex w-full rounded-md border-2 border-black bg-white text-black md:w-[65vw] ${isActive ? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-500 ease-in-out`}>

            <div className="items-around flex w-[40%] flex-col justify-around bg-[#10162F] p-5 px-8 text-white md:w-[35%] lg:w-[28%] ">
                <h2 className="text-xl font-bold">Popular Course Topics</h2>
                <p>Explore free or paid coruses in topics that interest you.</p>

                <button onClick={() => navigate('/course/all-courses')} className="btn btn-md bg-[#FFD301] hover:bg-[rgb(253,220,57)]">Explore All Courses</button>
            </div>
            
            <div className="flex w-[60%] flex-wrap justify-center gap-4 p-10 md:min-w-[65%] lg:min-w-[72%]">
                {
                    courseList.map((course) => <Link key={course} to={`/course/${course.trim().replace(/[\s/]+/g, '-').toLowerCase()}`}><p className="flex h-14 w-36 items-center justify-center">{course}</p></Link>)
                }
            </div>

        </div>
    )
}

CatalogContent.propTypes = {
    isActive: PropTypes.bool.isRequired
}

export default CatalogContent