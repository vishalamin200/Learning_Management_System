
import PropTypes from 'prop-types';

import Drawer from '../Components/Drawer';
import NewFooter from '../Components/Footer';
import Navbar from '../Components/Navbar-components/Navbar';

const HomeLayout = ({ children }) => {

    return (
        <div id='homelayout' >
            <Navbar id="navbar" />
            <Drawer />

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