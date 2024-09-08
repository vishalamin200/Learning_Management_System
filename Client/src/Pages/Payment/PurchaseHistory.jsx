
import { useEffect } from 'react'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { useDispatch, useSelector } from 'react-redux'

import EmptyState from '../../assets/Logos/emptystate.svg'
import HomeLayout from '../../Layouts/HomeLayout'
import { fetchPurchaseHistory } from '../../Redux/PaymentSlice'

const PurchaseHistory = () => {

  const purchaseDetails = useSelector((state) => state?.Payment?.purchaseHistory)

  const dispatch = useDispatch()

  useEffect(() => {
    const purchaseHistory = async () => {
      await dispatch(fetchPurchaseHistory())
    }
    purchaseHistory()
  }, [])

  const formateDate = (mongooseDate) => {

    if (!mongooseDate) {
      return null
    }
    const date = new Date(mongooseDate)
    const formatedDate = date.toLocaleDateString('in', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
    return formatedDate

  }

  return (

    <HomeLayout>
      <div id="purchse-history-page" className="min-h-[94vh] w-full px-5 pb-10 pt-24 md:min-h-screen md:px-16 md:pt-20">
        <div>
          <p className="mb-8 text-2xl font-bold underline md:my-8">Purchase History</p>
        </div>

        {(purchaseDetails && purchaseDetails.length > 0) ? <div>
          <table className='mt-8 hidden  w-full text-left text-lg text-black  md:table'>
            <thead className=''>
              <tr className='text-lg font-bold text-black'>
                <th className='py-4 '>Course</th>
                <th>Purchase On</th>
                <th>Expiry Date</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className='align-middle  text-lg'>
              {purchaseDetails && purchaseDetails.map((course) =>
                <tr key={course?.courseId}>
                  <td className='py-3'>{course?.courseTitle}</td>
                  <td>{formateDate(course?.purchaseAt)}</td>
                  <td>{formateDate(course?.expiresAt)}</td>
                  <td className=' align-middle'> <span><LiaRupeeSignSolid className='inline' />{course.amount / 100} </span></td>
                  <td>{course.paymentMethod ? course.paymentMethod : "Free Coupon"}</td>
                  <td>{course?.status}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className='flex flex-col md:hidden '>
            {
              purchaseDetails && purchaseDetails.map((course) =>

                <div key='course.id' className=''>
                  <div id="courseTitle" className="text-md flex items-center gap-x-4 font-bold">

                    <p>{course?.courseTitle}</p>
                  </div>
                  <table className='text-sm'>
                    <tr className='space-x-2'><td>Purchase On</td><td>{formateDate(course?.purchaseAt)}</td></tr>
                    <tr><td>Expiry Date</td><td>{formateDate(course?.expiresAt)}</td></tr>
                    <tr><td>Amount</td><td className=' align-middle'> <span><LiaRupeeSignSolid className='inline' />{course.amount / 100} </span></td></tr>
                    <tr className=''><td className='pr-8'> Payment Method</td><td>{course.paymentMethod ? course.paymentMethod : "Free Coupon"}</td></tr>
                    <tr><td>Status</td><td>{course?.status}</td></tr>
                  </table>
                  <hr className='my-5 border font-bold text-black line-through  ' />
                </div>

              )}
          </div>
        </div>
          :
          <div className='relative  mt-48 flex w-full flex-col items-center justify-center md:mt-24'>
            <img src={EmptyState} alt="Empty Page" className='w-[68%]' />
            <p className='text-base'>You haven&apos;t purchased any courses yet</p>
          </div>
        }

      </div>

    </HomeLayout>

  )
}

export default PurchaseHistory