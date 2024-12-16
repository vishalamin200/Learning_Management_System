import DashboardSidebar from "../Components/Admin-and-Instructor/DashboardSidebar"
import HomeLayout from "./HomeLayout"

 
const DashboardLayout = ({children}) => {
  return (
      <HomeLayout>
        <DashboardSidebar/>
        {children}
      </HomeLayout>
  )
} 

export default DashboardLayout