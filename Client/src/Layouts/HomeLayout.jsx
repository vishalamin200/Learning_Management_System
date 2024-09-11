
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import cancelIcon from '../assets/Logos/cancel-icon.webp';
import websiteLogo from '../assets/Logos/Website-logo.png';
import Drawer from '../Components/Drawer-components/Drawer';
import InsideCommunity from '../Components/Drawer-components/InsideCommunity';
import InsideProfile from '../Components/Drawer-components/InsideProfile';
import InsideResources from '../Components/Drawer-components/InsideResources';
import NewFooter from '../Components/Footer';
import Navbar from '../Components/Navbar-components/Navbar';
import { setCommunityExtended, setDrawer, setProfileExtended, setResourceExtended, toggleDrawer } from '../Redux/DrawerSlice';


const HomeLayout = ({ children }) => {
    const dispatch = useDispatch()
    const { isDrawerOpen, isProfileExtended, isResourceExtended, isCommunityExtended } = useSelector((state) => state.Drawer)

    const handleCloseButton = () => {
        dispatch(setDrawer(false))
        dispatch(setProfileExtended(false))
        dispatch(setResourceExtended(false))
        dispatch(setCommunityExtended(false))
    }

    return (
        <div id='homelayout' >
            <Navbar id="navbar" />
            <div className={` z-[1000] flex h-16 items-center justify-start pl-5 shadow-md lg:hidden ${isDrawerOpen ? 'fixed' : 'absolute'}  w-full bg-white`}>

                <Link to={('/')}><img src={websiteLogo} alt="website-logo" className='h-6 w-28' /></Link>
                <Drawer />

                {isDrawerOpen ? <button onClick={handleCloseButton} className=" absolute right-6 top-5 h-6 w-6">
                    <img src={cancelIcon} alt="cancel-icon" />
                </button>

                    : <button onClick={() => dispatch(toggleDrawer())} className='absolute right-6 top-5 '>
                        <GiHamburgerMenu size={24} />
                    </button>
                }

                {isProfileExtended && <InsideProfile />}

                {isResourceExtended && <InsideResources />}

                {isCommunityExtended && <InsideCommunity />}

            </div>

            <div id='layout-content' className=' relative h-[100%] w-[100%]  '>
                {children}
            </div>

            <NewFooter id="footer"/>
        </div>
    )
}

HomeLayout.propTypes = {
    children: PropTypes.node
}

export default HomeLayout