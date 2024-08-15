

import { Route, Routes } from 'react-router-dom'

import AccessDeniedPage from './Pages/AccessDeniedPage'
import ContactPage from './Pages/ContactPage'
import Home from './Pages/Home'
import Login from './Pages/Login'
import NotFoundPage from './Pages/NotFoundPage'
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

      </Routes>
    </>
  )
}

export default App
