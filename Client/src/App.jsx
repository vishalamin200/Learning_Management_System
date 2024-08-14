
import AccessDeniedPage from './Pages/AccessDeniedPage'
import ContactPage from './Pages/ContactPage'
import Login from './Pages/Login'
import NotFoundPage from './Pages/NotFoundPage'
import Signup from './Pages/Signup'


// import { Routes } from 'react-router-dom'

function App() {
  return (
    <>
      {/* <Routes> */}
      {/* <Route path='/' element={<Home />} /> */}
      {/* </Routes> */}

      {/*  */}
      {/* <Footer />*/}
      <Login />
      <Signup />
      <NotFoundPage/>
      <AccessDeniedPage/>
      <ContactPage/>

    </>
  )
}

export default App
