
import PropTypes from 'prop-types';

import Navbar from '../Components/Navbar-components/Navbar';
import NewFooter from '../Components/Footer';
import Sidebar from '../Components/Sidebar';

const HomeLayout = ({ children }) => {

    return (
        <div id='homelayout' >
            <Navbar id="navbar" />
            <Sidebar />

            <div id='layout-content' className=' relative h-[100%] w-[100%] '>
                {children}
            </div>


            <NewFooter id="footer" />
        </div>
    )
}

HomeLayout.propTypes = {
    children: PropTypes.node
}

export default HomeLayout