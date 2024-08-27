

import { Route, Routes } from 'react-router-dom'

import AccessDeniedPage from './Pages/AccessDeniedPage'
import AllCoursesPage from './Pages/Course/AllCoursesPage'
import CourseCategory from './Pages/Course/CourseCategory'
import Home from './Pages/Home'
import ChangePassword from './Pages/User/ChangePassword'
import ContactPage from './Pages/User/ContactPage'
import ForgotPassword from './Pages/User/ForgotPassword'
import LoginPage from './Pages/User/LoginPage'
import NewEditProfilePage from './Pages/User/NewEditProfilePage'
import NotFoundPage from './Pages/User/NotFoundPage'
import ResetPassword from './Pages/User/ResetPassword'
import SignupPage from './Pages/User/SignupPage'


function App() {

  return (
    <>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/contact' element={< ContactPage />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/denied' element={<AccessDeniedPage />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:userId/:token' element={<ResetPassword />} />
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path='/editProfile' element={<NewEditProfilePage />} />



        <Route path='/course/all-courses' element={<AllCoursesPage />} />
        <Route path={`/course/:category`} element={<CourseCategory />} />

      </Routes>
    </>
  )
}

export default App
