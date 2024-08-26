

 import { IoIosSearch } from 'react-icons/io'

import homePageImage from '../assets/Images/homePageImage.avif'

const OldHeroSection = () => {
    return (
        <div id="hero-section" className="flex min-h-[90%] flex-wrap py-32 pb-48">
            <div id="homePageImage" className="flex min-w-[40%] items-center justify-end pr-8">
                <img src={homePageImage} alt="home-page-image" className=" w-72" />
            </div>
            <div id="rightSection" className=" flex min-w-[60%] flex-col pl-8 ">
                <div id="search-field" className="flex  flex-col gap-y-2">

                    <p id="heading" className="text-5xl font-bold">Find your next course</p>

                    <div id="searchbox"  >
                        <label htmlFor="search" className="mt-6 flex h-[4rem] w-[38rem] items-center rounded-l-full rounded-r-full border border-black px-6 text-2xl shadow-lg transition-all duration-700 ease-in-out hover:border">

                            <input type="text" name="search" id="search" className="h-full w-full bg-inherit outline-none" />
                            <IoIosSearch size={42} />
                        </label>
                    </div>

                    <p className="ml-5 text-lg ">Or Browse by subject or university</p>

                </div>
                <div id="suggestedCourseTopics">
                    <div id="topicTemplate" className="h-12 w-fit bg-blue-200">
                        <div id="icon"></div>

                    </div>
                </div>

            </div>
        </div>)
}

export default OldHeroSection