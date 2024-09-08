import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"

import bgImage from '../../assets/Images/payment-gateway-bg-image.png'
import { createOrder, getKeyId, verifyOrder } from "../../Redux/PaymentSlice"


const PaymentPage = () => {

    const location = useLocation()
    const { role, data, course } = location.state
    const courseId = course?._id

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let keyId = null
    let orderId = null

    const paymentDetails = { razorpay_payment_id: "", razorpay_signature: "", courseId }

    const load = async () => {

        const thunkResponseKeyId = await dispatch(getKeyId())
        if (thunkResponseKeyId?.payload) {
            keyId = thunkResponseKeyId?.payload?.Data
        }

        if (!courseId) {
            toast.error("Error In Getting Course Details")
            navigate('/courseDetail', { state: { course } })
            return
        }

        const thunkResponseOrderId = await dispatch(createOrder({ courseId }))
        if (thunkResponseOrderId?.payload) {
            const order = thunkResponseOrderId?.payload?.Data
            if (order) {
                if (order === courseId) {
                    toast.success("Your have Already Purchased The Course")

                    navigate('/viewLectures', { state: { course, role } })

                    return
                }else if(order == 'Free'){
                    toast.success("Enrolled Successfully")
                    navigate('/viewLectures', { state: { course, role } }) 
                    return 
                }
                else {
                    orderId = order?.id

                    setTimeout(() => {
                        coursePayment()
                    }, 0);
                }
            } else {
                toast.error('Error In initiating the payment')
                navigate('/courseDetail', { state: { course } })
                return
            }
        }
    }

    useEffect(() => {
        load()
    }, [])


    const coursePayment = () => {
        if (!keyId || !orderId) {
            toast.error("Something Went Wrong, Please Try Again")
            navigate('/courseDetail', { state: { course } })
            return
        }
        const options = {

            key: keyId,
            order_id: orderId,

            name: 'CodeAcademy Pvt. Ltd.',
            description: 'Course Payment',

            prefill: {
                name: data?.fullName,
                email: data?.email,
                contact: data?.contact
            },
            theme: {
                color: '#3399cc'
            },

            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response?.razorpay_payment_id
                paymentDetails.razorpay_signature = response?.razorpay_signature
                paymentDetails.razorpay_order_id = orderId


                // Verify the payment, ie. check whether the if there is any fraud or something
                const thunkResponseVerify = await dispatch(verifyOrder(paymentDetails))
                if (thunkResponseVerify?.payload?.Success) {
                    setTimeout(() => {
                        navigate('/viewLectures', { state: { course, role } })
                    }, 1000);
                } else {
                    navigate('/courseDetail', { state: { course } })
                }
            },

            modal: {
                ondismiss: () => {
                    toast('Payment Is Cancelled')

                    setTimeout(() => {
                        navigate('/courseDetail', { state: { course } })
                    }, 300);
                }
            }
        }
        const razorpay = new window.Razorpay(options)
        razorpay.open()
    }

    return (
        <div className="h-screen w-full bg-slate-400" style={{ backgroundImage: `url(${bgImage})` }}>

        </div>
    )
}

export default PaymentPage