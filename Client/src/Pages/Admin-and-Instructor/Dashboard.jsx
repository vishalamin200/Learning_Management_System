import { ArcElement, BarElement, CategoryScale, Chart as Charjs, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'

import Payments from '../../Components/Admin-and-Instructor/Payments.jsx'
import DashboardLayout from '../../Layouts/DashbaordLayout.jsx'
import { fetchStudentsAndInstructors } from '../../Redux/StatisticsSlice.js'

Charjs.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)

const Dashboard = () => {
  // const totalNoOfStudents
  // const subscribedStudents
  // const categoryWiseNumberOfEnrolledStudents
  const dispatch = useDispatch()
  const { students, yearlyTotal, totalAmountsByMonth } = useSelector((state) => state.Statistics)

  const registeredUsers = students?.length
  const enrolledUsers = students.filter((student) => student.subscriptions.length > 0 && student?.subscriptions.some((sub) => sub.subscription_status === 'active')).length

  const userData = {
    labels: ['Registered Users', 'Enrolled Users'],
    datasets: [{
      label: 'User Count',
      data: [registeredUsers, enrolledUsers],
      backgroundColor: ['#FEA93F', 'green'],
      borderWidth: 1
    }]
  }

  const sellsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fontColor: 'black',
    datasets: [{
      label: 'Revenue',
      data: totalAmountsByMonth,
      backgroundColor: ["rgb(255,99,132)"],
      borderColor: ["white"],
      borderWidth: 2
    }]
  }

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months', // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: 'Rupees', // Y-axis label
        },
      },
    },
  };


  useEffect(() => {
    const fetchData = async () => {

      await dispatch(fetchStudentsAndInstructors())
    }
    fetchData()
  }, [])


  return (
    <DashboardLayout>
      <div className='pl-[20rem] pt-20'>
        <div className='min-h-screen w-full'>


          <div className='mx-7  grid grid-cols-2 gap-5 '>
            <div className='flex bg-white px-10 shadow-md'>

              <div id="piechart" className="flex h-80 w-full flex-col  items-center justify-center py-10 ">
                <p className='py-8  text-xl font-bold'>Users Details</p>
                <Pie data={userData} />
              </div>

              <div className='flex gap-x-10 pl-10  pt-16 text-center'>
                <p className='flex flex-col'> <p className='flex items-center gap-x-2'>Registered </p><p className='text-xl font-bold'>{registeredUsers}</p></p>
                <p className='flex flex-col'><p className='flex items-center gap-x-2'>Enrolled </p> <p className='text-xl font-bold'>{enrolledUsers} </p> </p>
              </div>

            </div>

            <div className='flex flex-col bg-white shadow-md '>

              <div id="piechart" className="flex h-80 w-full flex-col  items-center justify-center pt-10 ">
                <Bar data={sellsData} options={options} />
              </div>

              <div className='flex gap-x-3 py-6 pl-10 text-center text-lg '>
                <p className='flex items-center gap-x-1 font-bold'>Total Revenue:</p><p className=' font'>Rs.{yearlyTotal / 100}</p>
              </div>

            </div>
          </div>
          <Payments />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard