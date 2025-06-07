import { useEffect } from "react"
import toast from "react-hot-toast"
import { LiaRupeeSignSolid } from "react-icons/lia"
import { useDispatch, useSelector } from "react-redux"

import EmptyState from '../../assets/Logos/emptystate.svg'
import { fetchAllPayments, setSelectedMonth, setSelectedYear } from "../../Redux/StatisticsSlice"

const Payments = () => {
    const { paymentsByMonth, selectedMonth, selectedYear } = useSelector(state => state.Statistics)
    const dispatch = useDispatch()
    const count = 50
    const skip = 0


    const paymentsDetails = paymentsByMonth[selectedYear] ? paymentsByMonth[selectedYear][selectedMonth]?.items : null



    const formateDate = (timestamp) => {
        if (!timestamp) {
            return null
        }
        const date = new Date(timestamp * 1000)
        const formatedDate = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })
        return formatedDate
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const toastId = toast.loading("Fetching Payment Details...")
                selectedYear ? await dispatch(fetchAllPayments({ count, skip, year: selectedYear })) : null

                toast.dismiss(toastId)
                toast.success("Payments Fetch Successfully")
            } catch (error) {
                toast.success("Error In Fetching Payment Details :", error.message)
            }

        }
        if (!paymentsByMonth[selectedYear] || paymentsByMonth[selectedYear]?.length == 0) {
            fetchData()
        }

    }, [selectedYear])

    return (
        <div className="flex  w-full justify-center ">
            <div id="payment-history-page" className="min-h-[94vh] w-full px-5 pb-10 pt-10 md:min-h-screen md:px-16 ">
                <div className="flex items-center justify-between pr-10">
                    <p className="mb-8 text-2xl font-bold underline md:my-8">Payments History</p>
                    <div className="space-x-6">
                        <select onChange={(e) => dispatch(setSelectedMonth(e.target.value))} className="border border-black bg-inherit" value={selectedMonth} name="month" id="month">
                            <option value="Jan">January</option>
                            <option value="Feb">February</option>
                            <option value="Mar">March</option>
                            <option value="Apr">April</option>
                            <option value="May">May</option>
                            <option value="Jun">June</option>
                            <option value="Jul">July</option>
                            <option value="Aug">August</option>
                            <option value="Sep">September</option>
                            <option value="Oct">October</option>
                            <option value="Nov">November</option>
                            <option value="Dec">December</option>
                        </select>
                        <select onChange={(e) => dispatch(setSelectedYear(e.target.value))} value={selectedYear} name="year" id="year">
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </select>
                    </div>

                </div>


                {(paymentsDetails && paymentsDetails.length > 0) ? <div>
                    <table className='text-md   hidden w-full text-left text-black  md:table'>
                        <thead className=''>
                            <tr className='text-lg font-bold text-black'>
                                <th className='py-4 '>User</th>
                                <th className='py-4 '>Course</th>
                                <th>Purchase On</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className='text-md  text-center align-middle'>
                            {paymentsDetails && paymentsDetails.map((payment) =>
                                <tr key={payment?.id}>
                                    <td className='py-3 text-start'>{payment?.notes?.userName}</td>
                                    <td className='py-3 text-start'>{payment?.notes?.courseTitle}</td>
                                    <td>{formateDate(payment?.created_at)}</td>
                                    <td className=' align-middle'> <span><LiaRupeeSignSolid className='inline' />{payment.amount / 100} </span></td>
                                    <td>{payment.method ? payment.method : "Free Coupon"}</td>
                                    <td>{payment?.status === 'captured' ? 'Paid' : 'Pending'}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className='flex flex-col md:hidden '>
                        {
                            paymentsDetails && paymentsDetails.map((course) =>

                                <div key='course.id' className=''>
                                    <div id="courseTitle" className="flex items-center gap-x-4 text-sm font-bold">

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
                        <p className='text-base'>No transaction is done is this month</p>
                    </div>
                }

            </div>

        </div>
    )
}

export default Payments