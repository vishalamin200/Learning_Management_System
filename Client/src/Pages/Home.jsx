import { useNavigate } from "react-router-dom"

import genAi2 from '../assets/CourseImages/genAi-4.jpg'
import genAi1 from '../assets/CourseImages/genAi1.png'
import genAi3 from '../assets/CourseImages/genAi3.webp'
import courseraLogo from '../assets/Logos/courseraLogo.png'
import deepLearningLogo from '../assets/Logos/deepLearningLogo.png'
import IMBLogo from '../assets/Logos/IMBLogo.svg'
import HeroSection from "../Components/HeroSection"
import HomeLayout from "../Layouts/HomeLayout"


const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <HomeLayout>

        <HeroSection />

        <div id="homePage" className="flex h-full   w-full flex-col bg-[#FFFFFF] pt-16">

          <div id="buttom-section" className="flex h-fit flex-col items-center justify-center bg-[#FFFFFF] text-4xl font-bold text-violet-950 ">
            <p className="my-3 text-center">Find the best courses, wherever they exist</p>


            <div id="gen-ai-course-container" className="m-16 flex w-[90%] flex-wrap rounded-xl  border-2 border-none bg-[#EAF3FF] py-16 md:flex-nowrap  md:py-24 lg:w-fit">

              <div className="flex min-w-[30%] flex-col items-center  gap-y-6 px-6 md:items-baseline md:pl-10 md:pt-12 " id="getStarted">
                <p className="text-3xl font-bold">Get started with GenAI</p>
                <p className="text-center text-base md:text-start">Identify, develop and execute impactful GenAI business stretegies</p>
                <button onClick={() => navigate('/course/generative-ai')} className="btn btn-wide bg-[#0056D2] text-base text-white hover:bg-[#134d9f]">View All Gen Ai</button>
              </div>


              <div id="rightContainer" className="flex min-w-[70%] flex-col">
                <div id="buttons">

                </div>
                <div id="course templates" className="carousel carousel-start mx-10 flex gap-x-5 px-2 py-5 lg:w-fit">

                  <div className="carousel-item">
                    <div id="courseTemplate" className="h-[17rem] w-72 rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out md:hover:scale-105 md:hover:shadow-xl">
                      <div id="courseImage" className="inset-2 h-36 w-full">
                        <img src={genAi1} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col justify-around">

                        <div id="offeredBy" className="mt-2 flex items-center gap-x-2 text-sm text-slate-700"><div className="h-[18px] w-[32px] border" ><img src={IMBLogo} alt="" className="h-full w-full object-cover" /></div>IBM</div>
                        <p id="courseName" className="mb-4 text-[18px] font-bold">Generative Ai Fundamental</p>
                        <p id="type" className="pb-4 text-sm text-slate-700">Specilisation</p>
                      </div>
                    </div>
                  </div>


                  <div className="carousel-item">
                    <div id="courseTemplate" className=" h-[17rem] w-72 rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out md:hover:scale-105 md:hover:shadow-xl">
                      <div id="courseImage" className="inset-2 h-36 w-full">
                        <img src={genAi2} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col justify-around">

                        <div id="offeredBy" className="mt-2 flex items-center gap-x-2 text-sm text-slate-700"><div className="h-[18px] w-[18px] border" ><img src={deepLearningLogo} alt="" className="h-full w-full object-cover" /></div>Deeplearning.ai</div>

                        <p id="courseName" className="mb-4 text-[18px] font-bold">Ai For Good</p>
                        <p id="type" className="pb-4 text-sm text-slate-700">Specilisation</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div id="courseTemplate" className="m;d:hover:shadow-xl h-[17rem] w-72 rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out md:hover:scale-105">
                      <div id="courseImage" className="inset-2 h-36 w-full  ">
                        <img src={genAi3} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col justify-around">

                        <div id="offeredBy" className="mt-2 flex items-center gap-x-2 text-sm text-slate-700"><div className="h-[18px] w-[28px] border" ><img src={courseraLogo} alt="" className="h-full w-full object-cover" /></div>Coursera</div>

                        <p id="courseName" className="mb-4 text-[18px] font-bold">Neural Networks</p>
                        <p id="type" className="pb-4 text-sm text-slate-700">Specilisation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default Home