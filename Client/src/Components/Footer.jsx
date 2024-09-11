
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import codeAcademyLogo from '../assets/Logos/footer-website-logo.svg';

const Footer = () => {
  const Year = new Date().getFullYear()

  return (
    <div className='z-50 bg-[#1E1E2C] text-white'>
      <div className='flex h-fit w-full flex-wrap justify-between bg-[#1E1E2C] px-7 py-12 text-white md:h-72 md:justify-around md:px-16 '>

        <div id='first colulm' className='mb-12 flex w-44 flex-col gap-y-3'>
          <div>
            <img src={codeAcademyLogo} alt="CodeAcedemy-logo" className='h-10 w-36' />
          </div>
          <p className='w-full'>Learning often happens in classroom but it doesn&apos;t have to </p>

          <p>+913214586785</p>
          <p>vishalamin@gmail.com</p>

        </div>
        <div className='flex flex-col gap-y-3 '>
          <h3 className='mb-2 text-lg font-bold'>Quick Links</h3>
          <Link to="/about">About</Link>
          <Link to="/career">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/Pricing">Pricing</Link>
        </div>

        <div className='flex flex-col gap-y-3'>
          <h3 className='mb-2 text-lg font-bold'>Resources</h3>
          <Link to="/about">Courses</Link>
          <Link to="/career">Membership</Link>
          <Link to="/blog">Instructor</Link>
          <Link to="/Pricing">Faqs</Link>
        </div>

        <div className='flex flex-col gap-y-3'>
          <h3 className='mb-2 text-lg font-bold'>Support</h3>
          <Link to="/forem">Forums</Link>
          <Link to="/document">Documentations</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/community">Community</Link>
        </div>

        <div id='socials'>
          <h3 className='mb-2 text-lg font-bold'>Socials</h3>

          <ul className="flex flex-col items-center gap-5 md:flex-row">

            <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href="https://www.facebook.com/vishal.amin.5437/" target="_blank"><BsFacebook /></a></li>

            <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href="https://x.com/VishalA17564892" target="_blank"><BsTwitter /></a></li>

            <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href="https://www.linkedin.com/in/vishal-amin-1e/" target="_blank"><BsLinkedin /></a></li>

            <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href="https://www.instagram.com/vishal.amin200/" target="_blank"><BsInstagram /></a></li>
          </ul>
        </div>

      </div>
      <p className='pb-8 text-center'>{`copyright@${Year} All Rights Reserved`}</p>
    </div>
  )
}

export default Footer