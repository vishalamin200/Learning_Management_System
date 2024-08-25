


const ResourcesContent = ({isActive}) => {
    const courseList = ['Web Development', 'Data Science', 'Machine Learning', 'React', 'Git-Version Control', 'Data Structures', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'SQL', 'C++']


    return (
        <div id='resourceContent' className={`absolute left-40 top-[9vh] z-40 w-full border-2 border-black bg-white md:w-[65vw]  ${isActive? "translate-y-0" : "-translate-y-[200%]"} transition-all duration-500 ease-in-out`}>
            <div className="flex">

                <div id="upperSlice" className="items-around box-border flex min-w-[50%] flex-col justify-around bg-[#10162F] p-5 px-8 text-white md:min-w-[30%]">
                    <h2 className="text-2xl font-bold">Docs</h2>
                    <p>Find the Definitions, code syntex and documentations, for your favourite topic.</p>

                    <div><p>Handwritten Notes</p></div>
                </div>
                <div className="flex min-w-[50%] flex-wrap justify-around gap-2 p-5 text-black md:min-w-[70%]">
                    {
                        courseList.map((course) => <p key={course} className="flex h-12 w-36 items-center justify-center">{course}</p>)
                    }
                </div>
            </div>

            <div className=" flex">

                <div id="lowerSlice" className="items-around box-border flex min-w-[50%] flex-col justify-around bg-[#10162F] p-5 px-8 text-white md:min-w-[30%]">
                    <h2 className="text-2xl font-bold">Learning & Practice Tools</h2>

                    <div><p>Handwritten Notes</p></div>
                </div>
                <div className="box-border flex min-w-[50] flex-wrap justify-around gap-4 p-10 md:min-w-[70%]">
                    <div className="flex w-40 flex-col">
                        <h3 className="mb-2 font-bold text-black">Roadmap</h3>
                        <p>Structured roadmap for your learning</p>

                    </div>
                    <div className="flex w-40 flex-col">
                        <h3 className="mb-2 font-bold text-black">Cheatsheats</h3>
                        <p>Remember the concept for your course</p>
                    </div>
                    <div className="flex w-40 flex-col">
                        <h3 className="mb-2 font-bold text-black">Articles</h3>
                        <p>Learn About technical concepts</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResourcesContent