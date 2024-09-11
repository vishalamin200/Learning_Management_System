
import { useState } from 'react'

import default_Thumbnail from '../../assets/Images/default_thumbnail.png'

const CreateCourse = () => {

    const courseList = ['Web Development', 'Data Science', 'Machine Learning','Generative AI', 'MySql', 'Cloud Computing', 'Data Structures', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'UI/UX', 'C++']



    const [courseDetail, setCourseDetail] = useState({ courseName: "", thumbnail: "", description: "", category: "", price: 0, discount: 0 })
    const [previewThumbnail, setPreviewThumbnail] = useState(default_Thumbnail)

    const handlefileUpload = (e) => {
        e.preventDefault()

        const uploadedFile = e.target.files[0]
        if (uploadedFile) {
            setCourseDetail({ ...courseDetail, thumbnail: uploadedFile })

            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedFile)

            fileReader.addEventListener('load', () => {
                const fileUrl = fileReader.result
                setPreviewThumbnail(fileUrl)
            })
        }
    }

    return (
        <div id='create-course-page' className='flex h-fit  flex-col bg-gray-500 '>
            <div id='heading'>
                <p className='font-2xl text-center font-black'>Create A New Course</p>
            </div>
            <div className='form-container'>
                <form action="" className='flex w-full flex-col'>


                    <div className="m-12 my-2 md:w-[45%] ">

                        <p>Course Name<span className="text-red-500">*</span></p>

                        <label htmlFor='courseName'>
                            <input type="text"
                                name='courseName'
                                id='courseName'

                                value={courseDetail.courseName}
                                className="my-2 w-[96%]  rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none" />
                        </label>
                    </div>



                    <div className='m-12 flex justify-between'>

                        <div id='courseThumbnail' className='h-[25%] w-[50%]'>
                            <p>Thumbnail <span className="text-red-500">*</span></p>

                            <div className='thumbnail'>
                                <label htmlFor="thumbnail" className='  bg-black'>
                                    {previewThumbnail ? <img src={previewThumbnail} alt='thumbnail' className=' h-15 w-30 bg-black object-cover' /> : <img src={default_Thumbnail} alt='default_thumbnail' />}
                                </label>
                                <input
                                    onChange={handlefileUpload}
                                    readOnly
                                    type="file"
                                    name='thumbnail'
                                    id='thumbnail'
                                    className='hidden bg-fuchsia-900'
                                />
                            </div>
                            <div className='flex w-full justify-between'>
                                <div id='price-discount-wrapper' className='flex'>
                                    <div id='price' className="my-2  md:w-[45%] ">

                                        <p>Price<span className="text-red-500">*</span></p>

                                        <label htmlFor='price'>
                                            <input type="text"
                                                name='price'
                                                id='price'

                                                value={courseDetail.price}
                                                className="my-2 w-[96%]  rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none" />
                                        </label>
                                    </div>


                                    <div id='discount' className="my-2  md:w-[45%] ">

                                        <p>Discount</p>

                                        <label htmlFor='discount'>
                                            <input type="text"
                                                name='courseName'
                                                id='courseName'

                                                value={courseDetail.courseName}
                                                className="my-2 w-[96%]  rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none" />
                                        </label>
                                    </div>

                                </div>
                                <div id="category w-full">
                                    <select name="category" id="category" className=' select select-bordered inline-block max-w-xs text-lg' >
                                        <option disabled>Course Category</option>
                                        {courseList.map((course) => <option key={course}>{course}</option>)}
                                    </select>
                                </div>
                            </div>

                        </div>



                        <div id='description' className="mb-10  mt-2 flex w-[40%] flex-col items-end">
                            <p>Course Description<span className="text-red-500">*</span></p>



                            <textarea name="description" id="description" className="my-2 
                             h-[30rem] w-full resize-none overflow-hidden rounded-lg border border-black bg-inherit p-1 px-2 shadow-amber-50 outline-none " />

                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default CreateCourse