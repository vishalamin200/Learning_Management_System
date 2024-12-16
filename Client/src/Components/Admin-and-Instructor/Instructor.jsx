import PropTypes from 'prop-types';
import { IoMailOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

import deleteLogo from '../../assets/Logos/deleteLogo.png';
import { setDeleteUser, setSelectedCourses, toggleViewProfile } from '../../Redux/StatisticsSlice';
import ViewProfile from './ViewProfile';

const Instructor = ({ userDetails }) => {

  const { selectedCourses, viewProfile } = useSelector((state) => state.Statistics)
  const dispatch = useDispatch()

  const selectedCourseId = selectedCourses[userDetails._id] || userDetails.createdCourses[0]?.courseId?._id

  const selectedCourse = userDetails.createdCourses.find((sub) => sub.courseId?._id == selectedCourseId)?.courseId
  const paymentStatus = selectedCourse?.subscription_status
  const paymentAmount = selectedCourse?.paymentDetails?.amount


  return (
    <div key={userDetails?._id} className="relative flex justify-around gap-x-10 rounded-lg px-5 hover:bg-slate-200" >
       <div onClick={() => dispatch(toggleViewProfile(userDetails?._id))} id="avatar-name" className="relative flex w-72  items-center gap-x-5  py-3  hover:cursor-pointer">

        <label htmlFor="avatar" >
          <div className=" border-1 h-12 w-12 cursor-pointer rounded-full">
            <img src={userDetails?.avatar?.secure_url} alt="profile picture" className="h-12 w-12 cursor-pointer rounded-full" />
          </div>
        </label>

        <div className="items-between flex flex-col">
          <p className="text-lg font-bold">{userDetails?.fullName}</p>
          <p className="text-md ">{userDetails?.email}</p>
        </div>

        {(viewProfile == userDetails?._id) && <div className="absolute inset-0 bg-transparent "> <div className="relative top-24 z-30 min-h-fit min-w-[35rem]  rounded-md bg-white pb-3 pt-2 shadow-lg">

          <ViewProfile userInfo={userDetails} />

        </div> </div>}
      </div>


      <div id="course" className="relative flex w-[26rem] flex-col justify-center gap-y-2">

        {userDetails?.createdCourses.length == 0 ? <p className='mx-5  w-full select-none border-none bg-transparent px-5 outline-none'>No Course Is Created Yet</p> : <select onChange={(e) => dispatch(setSelectedCourses({ userId: userDetails._id, selectedCourse: e.target.value }))} name="enrolledCourse" id="enrolledCourse" className='mx-5 h-full w-full select-none border-none bg-transparent px-5 outline-none'>

          <option disabled className='text-md text-center font-bold'>Created Courses</option>

          {userDetails?.createdCourses.map(course => <option key={course?.courseId?.topic} value={course?.courseId?._id} className="px-5 py-2  text-xs font-bold hover:text-black">{course?.courseId?.topic}</option>)}
        </select>}

      </div>


      <div id="course-price" className="flex items-center">
        {
          <p>Rs.{selectedCourse?.price}</p>
        }
      </div>

      <div id="course-discount" className="flex items-center">
        {
          <p>{selectedCourse?.discount}%</p>
        }
      </div>

      <div id="course-status" className="flex items-center">
        {
          <p>{paymentStatus === 'active' && paymentAmount != 0 ? 'Paid' : paymentStatus === 'active' ? 'Free' : paymentStatus === 'created' ? 'Unpaid' : paymentStatus} </p>
        }
      </div>


      <div id="Options" className="flex items-center gap-3">

        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${userDetails?.email}&authuser=codeacademy2024@gmail.com`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoMailOutline size={20} />
        </a>


        <div className="  hidden items-center justify-center gap-2 lg:flex">
          <p className="text-lg text-red-700">
            <a href="#deleteUserAccountModel" className="flex items-center justify-center gap-x-1 text-lg font-semibold text-[#BF2735]"><img onClick={() => dispatch(setDeleteUser(userDetails?._id))} src={deleteLogo} alt="deleteLogo" className="h-5 w-5" /> </a>
          </p>
        </div>
      </div>
    </div>
  )
}


Instructor.propTypes = {
  userDetails: PropTypes.object
}

export default Instructor