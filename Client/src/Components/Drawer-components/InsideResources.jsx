import { FaChevronLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setDrawer, setResourceExtended } from '../../Redux/DrawerSlice';



const InsideResources = () => {

    const dispatch = useDispatch()


    //Must be customised based on userInfo

    const { isResourceExtended } = useSelector((state) => state.Drawer)

    const courseList = ['Web Development', 'Data Science', 'Machine Learning', 'React', 'Git-Version Control', 'Data Structures', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'SQL', 'C++']


    const handleLinkClick = () => {
        dispatch(setDrawer(false))
        dispatch(setResourceExtended(false))
    }

    return (
        <div id="profile-extended" className={` fixed left-0 top-[65px]  flex h-full  w-screen flex-col  bg-[#FFFFFF] text-white md:h-[90vh] md:w-[45vw] ${isResourceExtended ? 'translate-x-0' : '-translate-x-full'} z-30 transition-all  duration-300 ease-in-out lg:hidden`}>


            <div onClick={() => dispatch(setResourceExtended(false))} className="ml-7 mt-5 flex items-center gap-x-3  ">
                <div className=' text-black'>
                    <FaChevronLeft />
                </div>
                <div className=" flex items-center text-black">
                    <div id="back" className='text-lg'>Back</div>
                </div>
            </div>


            <hr className='mt-4 ' />
            <nav id='content' className='mx-7 flex flex-col gap-y-2 text-lg text-black'>

                <p className='py-3 text-center  text-2xl font-bold'>Resources</p>

                <div id='docs' className='bg-[#10162F] text-white'>
                    <h2 className=' text-center text-xl  font-bold'>Docs</h2>
                </div>

                {/* <Link onClick={handleLinkClick} to={'/myCourses'} ><h2>Web Deveopment</h2></Link> */}

                <div className="flex w-full flex-wrap justify-between  gap-2 px-2 py-2  ">
                    {
                        courseList.map((course) => <Link onClick={handleLinkClick} key={course} to={`/course/${course.trim().replace(/[\s/]+/g, '-').toLowerCase()}`}><p className="flex h-14 w-36 items-center ">{course}</p></Link>)
                    }
                </div>
                <div id='learning' className='bg-[#10162F] text-white'>
                    <h2 className=' text-center text-xl  font-bold'>Learning And Practice Tools</h2>

                </div>
                <div className='mx-2 mt-3 flex flex-wrap justify-between gap-y-3'>
                    <Link><h3 className=''>Roadmaps</h3></Link>
                    <Link><h3>Cheatsheat</h3></Link>
                    <Link><h3>Articles</h3></Link>
                    <Link><h3>Handwritten Notes</h3></Link>
                </div>
            </nav>
        </div>
    )
}

export default InsideResources