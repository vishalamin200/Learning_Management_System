

import { Route, Routes } from 'react-router-dom'

import AccessDeniedPage from './Pages/AccessDeniedPage'
import ContactPage from './Pages/ContactPage'
import ForgotPassword from './Pages/ForgotPassword'
import Home from './Pages/Home'
import Login from './Pages/Login'
import NotFoundPage from './Pages/NotFoundPage'
import ResetPassword from './Pages/ResetPassword'
import Signup from './Pages/Signup'

function App() {
  return (
    <>
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/denied' element={<AccessDeniedPage />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/resetPassword/:userId/:token' element={<ResetPassword />} />


      </Routes>
    </>
  )
}

export default App
