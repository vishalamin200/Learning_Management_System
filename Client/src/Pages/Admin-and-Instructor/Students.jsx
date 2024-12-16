import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserProfile from "../../Components/Admin-and-Instructor/UserProfile";
import UserProfileNotEnrolled from "../../Components/Admin-and-Instructor/UserProfileNotEnrolled";
import { BackButton, NextButton } from "../../Components/Course-components/Buttons";
import DashboardLayout from "../../Layouts/DashbaordLayout";
import { deleteUserOrInstructor, fetchStudentsAndInstructors, setUserStatus } from "../../Redux/StatisticsSlice";


const Students = () => {

    const { userStatus, deleteUser, students } = useSelector((state) => state.Statistics)

    const [page, setPage] = useState({ enrolled: 1, notEnrolled: 1 })

    const allEnrolledStudents = students.filter((student) => student.subscriptions.length > 0 && student?.subscriptions.some((sub) => sub.subscription_status === 'active'))

    const allNotEnrolledStudents = students.filter((student) => student.subscriptions.length == 0)

    const [enrolledStudents, setEnrolledStudents] = useState(allEnrolledStudents?.slice((page['enrolled'] - 1) * 5, page['enrolled'] * 5))

    const [notEnrolledStudents, setNotEnrolledStudents] = useState(allNotEnrolledStudents?.slice((page['notEnrolled'] - 1) * 10, page['notEnrolled'] * 10))

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchStudentsAndInstructors())
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (userStatus === 'enrolled') {
            setEnrolledStudents(allEnrolledStudents.slice((page['enrolled'] - 1) * 5, page['enrolled'] * 5))
        } else if (userStatus === 'notEnrolled') {
            setNotEnrolledStudents(allNotEnrolledStudents.slice((page['notEnrolled'] - 1) * 10, page['notEnrolled'] * 10))
        }
    }, [page, userStatus, students])

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

        if (userStatus == 'enrolled') {
            if (Math.ceil(allEnrolledStudents?.length / 5) > page[userStatus]) {
                setPage({ ...page, 'enrolled': page[userStatus] + 1 })
            }
        } else if (userStatus === 'notEnrolled') {
            if (Math.ceil(allNotEnrolledStudents?.length / 10) > page[userStatus]) {
                setPage({ ...page, 'notEnrolled': page[userStatus] + 1 })
            }
        }
    }

    const handleBackButton = () => {

        if (userStatus == 'enrolled') {
            if (page[userStatus] > 1) {
                setPage({ ...page, 'enrolled': page[userStatus] - 1 })
            }
        } else if (userStatus === 'notEnrolled') {
            if (page[userStatus] > 1) {
                setPage({ ...page, 'notEnrolled': page[userStatus] - 1 })
            }
        }
    }

    return (
        <DashboardLayout>
            <div id="student-details" className="min-h-screen w-full pl-72 pt-20 ">
                 <div className="ml-8 flex justify-between py-5">
                    <h1 className="flex items-center  text-2xl font-bold">Students Details</h1>

                    <div className="mr-24">
                        <select className="h-8 w-40 border border-black text-lg" onChange={(e) => dispatch(setUserStatus(e.target.value))} name="user-status" id="user-status">
                            <option value="enrolled">Enrolled</option>
                            <option value="notEnrolled">Not Enrolled</option>
                        </select>
                    </div>
                </div>

                <div id="students-container" className="ml-8 mr-6  flex flex-wrap gap-x-10 gap-y-5 rounded-lg ">

                    {userStatus === 'enrolled' && enrolledStudents.map(student =>
                        <div key={student?._id} className="flex w-[95%] flex-col rounded-lg bg-white"> <UserProfile userDetails={student} /> </div>
                    )}

                    {userStatus === 'notEnrolled' && notEnrolledStudents.map(student => <div key={student?._id} className="flex w-[45%] flex-wrap rounded-lg bg-white">          <UserProfileNotEnrolled userDetails={student} />
                    </div>
                    )}
                </div>

                {(notEnrolledStudents.length > 0) && <div className='mb-8 mr-24 mt-8  flex items-center justify-end gap-x-5 '>
                    <BackButton handleBack={handleBackButton} />
                    <p className='text-xl'>{page[userStatus]}</p>
                    <NextButton handleNext={handleNextButton} />
                </div>}
            </div>



            <div className="modal text-black" role="dialog" id="deleteUserAccountModel">
                <div className="modal-box text-base md:text-lg">
                    <h3 className="text-center  text-xl font-bold ">Are you sure you want to delete this user account?</h3>
                    <p className="text-md pt-6 lg:pl-5">All the subscription for this user will be cancelled.</p>
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

export default Students