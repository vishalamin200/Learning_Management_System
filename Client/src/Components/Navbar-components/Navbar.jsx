
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { VscTriangleDown } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Default_Profile from '../../assets/Images/Default_Profile.webp';
import codeAcademyLogo from '../../assets/Logos/CodeAcademy_logo_final.jpg';
import AvatarContent from "./AvatarContent";
import CatalogContent from "./CatalogContent";
import CommunityContent from "./CommunityContent";
import ResourcesContent from "./ResourcesContext";

const Navbar = () => {

  const navigate = useNavigate()

  const { isLoggedIn, data } = useSelector((state) => state.Auth)
  const profilePicture = data?.avatar?.secure_url || Default_Profile

  const userName = data?.fullName

  const [navbar, setNavbar] = useState({ catalog: false, resources: false, community: false, career: false, avatar: false })

  const toggleNav = (e) => {
    e.preventDefault()
    const buttonName = e.target.name

    setNavbar((prevState) => ({ catalog: false, resources: false, community: false, career: false, avatar: false, [buttonName]: !prevState[buttonName] }))
  }




  return (
    <div>
      <div id="navbar" className="absolute top-0 z-50 flex h-[10vh] w-[100%] flex-shrink  items-center justify-around bg-[#FFFFFF] shadow-lg" >
        <div>
          <img src={codeAcademyLogo} alt="CodeAcedemy-logo" className='h-16 w-36' />
        </div>
        <div>
          <nav className='flex items-center justify-center gap-5'>

            <div>
              <button
                onClick={() => navigate('/')} className='text-bold btn btn-sm flex flex-nowrap items-center border-none bg-inherit text-black shadow-none outline-none hover:border-none hover:bg-inherit hover:text-[#5032F3]' name='home'>
                Home
              </button>
            </div>

            <div>
              <button
                onClick={toggleNav} className='btn btn-sm flex flex-nowrap items-center border-none bg-inherit text-black shadow-none outline-none hover:border-none hover:bg-inherit hover:text-[#5032F3]' name='catalog'>
                Catalog
                <VscTriangleDown onClick={toggleNav} name="catalog" className={`inset-0  ${navbar.catalog ? 'origin-center rotate-180' : 'rotate-0'} min-h-6 w-3 transition-all duration-200`} />
              </button>
            </div>


            <div>
              <button onClick={toggleNav} className='z-60 btn btn-sm flex flex-nowrap items-center border-none bg-inherit text-black shadow-none outline-none hover:border-none hover:bg-inherit hover:text-[#5032F3]' name='resources'>
                Resources
                <VscTriangleDown className={`inset-0  ${navbar.resources ? 'origin-center rotate-180' : 'rotate-0'} min-h-6 w-3 transition-all duration-200`} />
              </button>
            </div>

            <div>
              <button onClick={toggleNav} className='z-60 btn btn-sm flex flex-nowrap items-center border-none bg-inherit text-black shadow-none outline-none hover:border-none hover:bg-inherit hover:text-[#5032F3]' name='community'>
                Community
                <VscTriangleDown className={`inset-0  ${navbar.community ? 'origin-center rotate-180' : 'rotate-0'} min-h-6 w-3 transition-all duration-200`} />
              </button>
            </div>

            <div>
              <button onClick={() => navigate('/contact')} className='z-60 btn btn-sm flex flex-nowrap items-center border-none bg-inherit text-black shadow-none outline-none hover:border-none hover:bg-inherit hover:text-[#5032F3]' name='contact'>
                Contact Us
              </button>
            </div>

            <div>
              <button onClick={() => navigate('/career')} className='z-60 btn btn-sm flex flex-nowrap items-center border-none bg-inherit text-black shadow-none outline-none hover:border-none hover:bg-inherit hover:text-[#5032F3]' name='career'>
                Career Center

              </button>
            </div>

          </nav>
        </div>

        <div className='z-50 flex'>
          <form className='flex items-center justify-center' >
            <label htmlFor="search-space z-50"></label>
            <input type="search" name="" id="search-space" />
            <IoIosSearch size={28} className="z-50" />
          </form>
        </div>


        {isLoggedIn ?
          <div className="mr-8 flex items-center">
            <img name="avatar" onClick={toggleNav} src={profilePicture} alt="user-profile" className="mr-3 h-11 w-11 cursor-pointer rounded-full" />
            <div >
              <p className="m-0 p-0 text-xs text-gray-700">Hello</p>
              <p className="m-0 p-0 text-base font-bold text-black">{userName}</p>
            </div>
          </div>
          : <div className='flex items-center justify-center gap-3'>
            <button onClick={() => navigate('/login')} name="login" className="btn btn-sm w-20 border-black bg-transparent font-bold text-[#5032F3]">Log in</button>

            <button onClick={() => navigate('/signup')} name="signup" className="btn btn-sm w-20  bg-[#5032F3] text-white hover:text-black">Sign Up</button>
          </div>}
      </div >


      <div className="nav-content">
        {navbar.catalog ? <CatalogContent isActive={true} /> : <CatalogContent isActive={false} />}
        {navbar.community ? <CommunityContent isActive={true} /> : <CommunityContent isActive={false} />}
        {navbar.resources ? <ResourcesContent isActive={true} /> : <ResourcesContent isActive={false} />}
        {navbar.avatar ? <AvatarContent isActive={true} /> : <AvatarContent isActive={false} />}
      </div>

    </div>
  )
}

export default Navbar