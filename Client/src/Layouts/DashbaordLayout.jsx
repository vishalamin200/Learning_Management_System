import PropTypes from 'prop-types'

import DashboardSidebar from "../Components/Admin-and-Instructor/DashboardSidebar"
import HomeLayout from "./HomeLayout"


const DashboardLayout = ({ children }) => {
  return (
    <HomeLayout>
      <DashboardSidebar />
      {children}
    </HomeLayout>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node
}

export default DashboardLayout