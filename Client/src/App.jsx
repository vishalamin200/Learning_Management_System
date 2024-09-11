

import { Route, Routes } from 'react-router-dom'

import AccessDeniedPage from './Pages/AccessDeniedPage'
import Dashboard from './Pages/Admin-and-Instructor/Dashboard'
import AddLecture from './Pages/Course/AddLecture'
import AllCoursesPage from './Pages/Course/AllCoursesPage'
import CourseCategory from './Pages/Course/CourseCategory'
import CourseDetailPage from './Pages/Course/CourseDetailPage'
import CreateCourse from './Pages/Course/CreateCourse'
import EditCourse from './Pages/Course/EditCourse'
import EditLecture from './Pages/Course/EditLecture'
import MyCourses from './Pages/Course/MyCourses'
import ViewLectures from './Pages/Course/ViewLectures'
import DataDeletionPage from './Pages/DataDeletionPage'
import Home from './Pages/Home'
import NotFoundPage from './Pages/NotFoundPage'
import PaymentPage from './Pages/Payment/PaymentPage'
import PurchaseHistory from './Pages/Payment/PurchaseHistory'
import AuthLoginSuccess from './Pages/User/AuthLoginSuccess'
import ChangePassword from './Pages/User/ChangePassword'
import ContactPage from './Pages/User/ContactPage'
import ForgotPassword from './Pages/User/ForgotPassword'
import LoginPage from './Pages/User/LoginPage'
import NewEditProfilePage from './Pages/User/NewEditProfilePage'
import ResetPassword from './Pages/User/ResetPassword'
import SignupPage from './Pages/User/SignupPage'


function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/auth-login/success' element={<AuthLoginSuccess />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/contact' element={< ContactPage />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/denied' element={<AccessDeniedPage />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:userId/:token' element={<ResetPassword />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/editProfile' element={<NewEditProfilePage />} />
        <Route path='/data-deletion' element={<DataDeletionPage />} />



        <Route path='/course/all-courses' element={<AllCoursesPage />} />
        <Route path={`/course/:category`} element={<CourseCategory />} />
        <Route path='/myCourses' element={<MyCourses />} />
        <Route path='/createCourse' element={<CreateCourse />} />
        <Route path='/addLecture' element={<AddLecture />} />
        <Route path='/courseDetail' element={<CourseDetailPage />} />
        <Route path='/my-courses/edit-course' element={<EditCourse />} />
        <Route path='/my-courses/purchase-history' element={<PurchaseHistory />} />
        <Route path='/viewLectures' element={<ViewLectures />} />
        <Route path='/editLecture' element={<EditLecture />} />


        <Route path='/course/checkout' element={<PaymentPage />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />

      </Routes>
    </>
  )
}

export default App


