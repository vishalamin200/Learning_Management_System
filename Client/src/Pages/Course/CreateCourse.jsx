import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '../../Layouts/HomeLayout'
import { createCourse } from '../../Redux/CourseSlice'



const CreateCourse = () => {

    const courseList = ['Web Development', 'Data Science', 'Machine Learning', 'Generative AI', 'MySql', 'Cloud Computing', 'Data Structures', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'UI/UX', 'C++']

    const dispatch = useDispatch()

    const { data } = useSelector((state) => state.Auth)
    const creatorName = data?.fullName
    const creatorEmail = data?.email

    const navigate = useNavigate()


    const [courseDetail, setCourseDetail] = useState({ topic: "", thumbnail: "", description: "", category: "", price: 0, discount: 0, level: "", language: "", createdBy: creatorName, creatorEmail })

    const [previewThumbnail, setPreviewThumbnail] = useState(null)

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

    const handleInputChange = (e) => {
        e.preventDefault()

        const { name, value } = e.target
        setCourseDetail({ ...courseDetail, [name]: value })
    }

    const handleRemoveThumbnail = (e) => {
        e.preventDefault()
        setPreviewThumbnail(null)
        setCourseDetail({ ...courseDetail, thumbnail: undefined })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        //Validate the course Detals
        const { topic, category, description, thumbnail, price, discount, level, language } = courseDetail

        if (!topic || !category || !description || !thumbnail || price === null || price === undefined || discount === null || discount === undefined || !level || !language) {
            toast('All Marked Fields Are Mandatory')
            return
        }

        if (topic.length <= 4) {
            toast.error('Title Is Too Short')
            return
        }

        if (topic.length > 180) {
            toast.error('Title Is Too Long')
            return
        }

        if (description.length < 60) {
            toast.error('Description Is Too Short, It Should Have Atleast 60 Characters')
            return
        }

        if (description.length > 3000) {
            toast.error('Description Is Too Long, It Should Have less than 3000 Characters')
            return
        }

        if (price > 100000) {
            toast.error('Maximum Price Of Course Must be less than 1,00,000rs')
            return
        }

        if (discount < 0) {
            toast.error("Discount Can't be Negative")
            return
        }

        if (discount > 100) {
            toast.error("Discount Can't be More than 100%")
            return
        }

        const formData = new FormData()
        Object.entries(courseDetail).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const thunkResponse = await (dispatch(createCourse(formData)))
        if (thunkResponse?.payload?.Data) {
            console.log("Response : ", thunkResponse?.payload?.Data)

            const courseId = thunkResponse?.payload?.Data?._id

            if (courseId) {
                setTimeout(() => {
                    navigate(`/addLecture/`, { state: { courseId } });
                }, 2000);
            }
        } else {
            return
        }
    }


    return (
        <HomeLayout>
            <div id='course-creation-page' className='mt-18 pb-24 pt-24'>

                <div id="header" className="mb-12 flex items-center justify-center ">
                    <ul className="steps">
                        <li className="step step-primary w-32 md:w-56 ">Create Course</li>
                        <li className="step w-32  md:w-56">Add Lectures</li>
                        <li className="step w-32  md:w-56">Publish</li>
                    </ul>
                </div>

                <form onSubmit={handleFormSubmit} className="flex flex-wrap lg:flex-nowrap" >

                    <div id="newCourseInformation" className="mx-7 flex min-w-[50%] flex-col gap-y-6 md:mx-10">

                        <h2 className="text-center text-2xl font-bold">Course Information</h2>

                        <label htmlFor="courseTitle">
                            <p className="mb-1 text-xl font-bold">Title</p>
                            <input onChange={handleInputChange} type="text" name="topic" value={courseDetail.topic} id="courseTitle" className="h-10 w-full rounded-lg px-5 text-lg" placeholder='e.g. The Ultimate Fullstack Web Development Bootcamp' />
                        </label>

                        <div className="flex w-full flex-wrap justify-between gap-x-3 gap-y-5 md:flex-nowrap">

                            <label htmlFor="category" >

                                <p className="mb-1 text-xl font-bold">Category</p>
                                
                                <select onChange={handleInputChange} name="category" value={courseDetail?.category} id="category" className="h-10 w-56 rounded-lg text-center text-lg">
                                    <option value="" hidden>Select Category</option >
                                    {courseList.map((course) => <option key={course} value={course}>
                                        {course}
                                    </option>)}
                                </select>

                            </label>
                            <label htmlFor="level">
                                <p className="mb-1 text-xl font-bold">Level</p>
                                <select onChange={handleInputChange} name="level" value={courseDetail?.level} id="level" className="h-10 w-56 rounded-lg text-center text-lg">
                                    <option value="" hidden>Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advance">Advance</option>
                                </select>
                            </label>

                            <label htmlFor="language">
                                <p className="mb-1 text-xl font-bold">Language</p>
                                <select onChange={handleInputChange} name="language" value={courseDetail?.language} id="language" className="h-10 w-56 rounded-lg text-center text-lg">
                                    <option value="" hidden>Select Language</option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Hinglish">Hinglish</option>
                                    <option value="Kannada">Kannada</option>
                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Bengali">Bengali</option>
                                    <option value="Gujarati">Gujarati</option>
                                    <option value="Marathi">Marathi</option>
                                    <option value="Punjabi">Punjabi</option>
                                    <option value="Malayalam">Malayalam</option>
                                    <option value="Assamese">Assamese</option>
                                    <option value="Manipuri">Manipuri</option>
                                </select>
                            </label>
                        </div>
                        <label htmlFor="description">
                            <p className="mb-1 text-xl font-bold">Description</p>
                            <textarea onChange={handleInputChange} name="description" value={courseDetail?.description} id="description" className="h-[26rem] w-full rounded-lg px-6 pt-5 text-[16px]" />
                        </label>

                    </div>
                    <div id="Thumnail-upload-container" className="mt-8 flex flex-col gap-y-10 px-7 md:px-12 lg:mt-0 lg:w-[50%]">
                        <div className='thumbnail'>
                            <p className="mb-1 text-2xl font-bold">Thumbnail</p>
                            <label htmlFor="thumbnail" className='inline-block h-[10rem] w-[20rem] cursor-pointer border-2 border-dashed border-black md:h-[18rem] md:w-[36rem]'>
                                {previewThumbnail && <img src={previewThumbnail} alt='thumbnail' className='object-fit inline-block h-full w-full' />}
                            </label>
                            <input
                                onChange={handlefileUpload}
                                accept='.jpg,.png,.jfif,.jpeg'
                                readOnly
                                type="file"
                                name='thumbnail'
                                id='thumbnail'
                                className='hidden'
                            />

                            <div className='flex items-center justify-center pt-5'><button onClick={handleRemoveThumbnail} ><p>Remove Thumbnail</p></button></div>
                        </div>

                        <div className="flex justify-between gap-x-10">
                            <label htmlFor="price">
                                <p className="mb-1 text-xl font-bold">Price (Rs.)</p>
                                <input onChange={handleInputChange} type="text" name="price" value={courseDetail?.price} id="price" className='h-10 w-40 rounded-lg text-center text-lg md:w-fit' defaultValue={0} />
                            </label>

                            <label htmlFor="discount">
                                <p className="mb-1 text-xl font-bold">Discount (%)</p>
                                <input onChange={handleInputChange} type="text" name="discount" value={courseDetail?.discount} id="discount" className='h-10 w-40 rounded-lg text-center text-lg md:w-fit' defaultValue={0} />
                            </label>
                        </div>

                        <label htmlFor="createdBy">
                            <p className="mb-2 text-xl font-bold">Course Creator</p>
                            <input onChange={handleInputChange} type="text" name="createdBy" id="createdBy" className='h-10 cursor-not-allowed rounded-lg text-center text-lg' value={courseDetail.createdBy} />
                        </label>
                        <div className="flex justify-between gap-x-10">

                            <button className="h-12  w-32 rounded-xl bg-yellow-600 font-bold text-white">Save as Draft</button>
                            <button type='submit' className="h-12  w-32  rounded-xl bg-[#4A00FF] font-bold text-white">Save & Next</button>
                        </div>

                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse