import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Instructor from "../../Components/Admin-and-Instructor/Instructor";
import { BackButton, NextButton } from "../../Components/Course-components/Buttons";
import DashboardLayout from "../../Layouts/DashbaordLayout";
import { deleteUserOrInstructor, fetchStudentsAndInstructors, setUserStatus } from "../../Redux/StatisticsSlice";


const Instructors = () => {

    const { deleteUser } = useSelector((state) => state.Statistics)
    const allInstructors = useSelector((state) => state.Statistics?.instructors)


    const [page, setPage] = useState(1)
    const [instructors, setInstructors] = useState(allInstructors.slice((page - 1) * 5, page * 5))


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchStudentsAndInstructors())
        }
        fetchData()
    }, [])

    useEffect(() => {
        setInstructors(allInstructors.slice((page - 1) * 5, page * 5))
    }, [page, allInstructors])

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleDeleteAccount = async (e) => {
        e.preventDefault()

        if (!deleteUser) {
            toast.error('UserId Is Missing')
            return
        }
        const thunkResponse = await dispatch(deleteUserOrInstructor({ userId: deleteUser }))
        if (thunkResponse?.payload?.Success) {
            navigate(-1)
        }
    }

    const handleNextButton = () => {
        if (Math.ceil(instructors?.length / 5) > page) {
            setPage(page + 1)
        }
    }

    const handleBackButton = () => {
        page > 1 ? setPage(page - 1) : null
    }

    return (
        <DashboardLayout>
            <div id="instructor-details" className="min-h-screen w-full pl-72 pt-20 ">
                 <div className="ml-8 flex justify-between py-5">
                    <h1 className="flex items-center  text-2xl font-bold">Instructors Details</h1>

                    <div className="mr-24">
                        <select className="h-8 w-40 border border-black text-lg" onChange={(e) => dispatch(setUserStatus(e.target.value))} name="user-status" id="user-status">
                            <option value="enrolled">Enrolled</option>
                            <option value="notEnrolled">Not Enrolled</option>
                        </select>
                    </div>
                </div>

                <div id="instructors-container" className="ml-8 mr-6  flex flex-wrap gap-x-10 gap-y-5 rounded-lg ">

                    {instructors.map(instructor =>
                        <div key={instructor?._id} className="flex w-[95%] flex-col rounded-lg bg-white"> <Instructor userDetails={instructor} /> </div>
                    )}

                </div>

                {(instructors.length > 0) && <div className='mb-8 mr-24 mt-8  flex items-center justify-end gap-x-5 '>
                    <BackButton handleBack={handleBackButton} />
                    <p className='text-xl'>{page}</p>
                    <NextButton handleNext={handleNextButton} />
                </div>}
            </div>


            <div className="modal text-black" role="dialog" id="deleteInstructorAccountModel">
                <div className="modal-box text-base md:text-lg">
                    <h3 className="text-center  text-xl font-bold ">Are you sure you want to delete this Instructor account?</h3>
                    <p className="text-md pt-6 lg:pl-5">All the details for this instructor will be permanently delete.</p>
                    <p className="text-md lg:pl-5">This action can not be undone.</p>
                    <div className="modal-action">
                        <div className=" mt-5 flex w-full items-center  justify-around">

                            <button onClick={() => navigate(-1)} className=' btn-sqaure btn  mb-2  w-24 rounded-lg border-2    border-slate-700 bg-inherit text-xl text-slate-700 '>Cancel
                            </button>

                            <button onClick={handleDeleteAccount} className=' btn-sqaure w-46  btn btn-md  mb-2  block rounded-lg border-none  border-black bg-red-700 text-lg text-white hover:bg-red-800'> Delete Account </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Instructors