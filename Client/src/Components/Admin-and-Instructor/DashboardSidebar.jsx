import { FaUserLarge, FaUserTie } from 'react-icons/fa6'
import { IoStatsChartOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const DashboardSidebar = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div id="lesson-navigator" className={`absolute top-16 z-10 flex  w-[20vw] flex-col border bg-slate-900 text-white shadow-md transition-all  duration-300  ease-in-out md:h-[91%] md:w-[20%] md:translate-x-0 md:bg-inherit md:text-black `}>

                <div id="sidebar-heading" className="mt-8 flex items-center justify-between px-12 pb-8">

                    <p className=" pl-4 text-xl font-bold">Dashboard</p>
                    {/* <div className="hidden cursor-pointer md:block" ><FaArrowLeftLong size={24} /></div> */}

                    <button className=" absolute  right-6 md:hidden ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <hr className="border-1 w-full border-black font-black" />
                <div id="navigation" className="flex flex-col items-start gap-y-5 pl-16 pt-6 text-lg font-semibold">
                    <button onClick={() => navigate('/admin/dashboard')}><div className='flex items-center justify-center gap-x-3'><IoStatsChartOutline /><p>Statistics</p></div></button>

                    <button onClick={() => navigate('/admin/dashboard/instructors')}><div className='flex items-center justify-center gap-x-3'><FaUserTie /><p>Instructors</p></div></button>

                    <button onClick={() => navigate('/admin/dashboard/students')}><div className='flex items-center justify-center gap-x-3'><FaUserLarge /><p>Students</p></div></button>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar