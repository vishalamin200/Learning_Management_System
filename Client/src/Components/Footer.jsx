import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"


const Footer = () => {
    const Year = new Date().getFullYear()

    return (

        <footer className="relative bottom-0 left-0 flex h-[10vh] w-full items-center  justify-between bg-slate-600 px-8 text-white md:px-28" >

            <p >{`copyright@${Year} All Rights Reserved`}</p>

            <ul className="flex gap-5 ">
                <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href=""><BsFacebook /></a></li>
                <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href=""><BsTwitter /></a></li>
                <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href=""><BsLinkedin /></a></li>
                <li className="delay-600 transition-all ease-in-out hover:text-yellow-400"><a href=""><BsInstagram /></a></li>
            </ul>

        </footer>
    )
}

export default Footer