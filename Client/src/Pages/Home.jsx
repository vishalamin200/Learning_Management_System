import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import genAi1 from '../assets/CourseImages/genai1.png'
import genAi3 from '../assets/CourseImages/genai3.webp'
import genAi2 from '../assets/CourseImages/genai4.jpg'
import HeroSection from "../Components/HeroSection"
import HomeLayout from "../Layouts/HomeLayout"
import { fetchCourseByCategory } from "../Redux/CourseSlice"


const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchCourses = async () => {
        await dispatch(fetchCourseByCategory({ category:"generative-ai" }))
    };
    fetchCourses()
  });

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
                    <div onClick={() => navigate("/courseDetail/6998425b61d63a17ec4bd826")} id="courseTemplate" className="h-[17rem] w-72 cursor-pointer rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out md:hover:scale-105 md:hover:shadow-xl">
                      <div id="courseImage" className="inset-2 h-36 w-full">
                        <img src={genAi1} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col justify-around">

                        <div id="offeredBy" className="mt-2 flex items-center gap-x-2 text-sm text-slate-700">
                          Vishal Amin
                        </div>
                        <p id="courseName" className="mb-4 text-[18px] font-bold">Generative Ai Fundamental</p>
                        <p id="type" className="pb-4 text-sm text-slate-700">Specilisation</p>
                      </div>
                    </div>
                  </div>


                  <div className="carousel-item">
                    <div onClick={() => navigate("/courseDetail/699842ac61d63a17ec4bd907")} id="courseTemplate" className="h-[17rem] w-72 cursor-pointer rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out md:hover:scale-105 md:hover:shadow-xl">
                      <div id="courseImage" className="inset-2 h-36 w-full">
                        <img src={genAi2} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col justify-around">

                        <div id="offeredBy" className="mt-2 flex items-center gap-x-2 text-sm text-slate-700">
              
                          Andrei Neagoie
                          
                          </div>

                        <p id="courseName" className="mb-4 text-[18px] font-bold">Ai For Good</p>
                        <p id="type" className="pb-4 text-sm text-slate-700">Specilisation</p>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <div onClick={() => navigate("/courseDetail/6998434161d63a17ec4bda04")} id="courseTemplate" className="m;d:hover:shadow-xl h-[17rem] w-72 cursor-pointer rounded-xl border-none bg-[#FFFFFF] p-2 text-black transition-all duration-500 ease-in-out md:hover:scale-105">
                      <div id="courseImage" className="inset-2 h-36 w-full  ">
                        <img src={genAi3} alt="courseImage" className="h-full w-full rounded-xl object-cover" />
                      </div>
                      <div id="courseDetails" className="items-base mx-2 mb-2 flex h-[50%] flex-col justify-around">

                        <div id="offeredBy" className="mt-2 flex items-center gap-x-2 text-sm text-slate-700">
                          Geoffrey Hinton</div>

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