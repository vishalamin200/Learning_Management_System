import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import deleteLogo from '../../assets/Logos/deleteLogo.png';
import HomeLayout from '../../Layouts/HomeLayout';
import { deleteCourse, editCourse } from '../../Redux/CourseSlice';



const EditCourse = () => {

    const courseList = ['Web Development', 'Data Science', 'Machine Learning', 'Generative AI', 'MySql', 'Cloud Computing', 'Data Structures', 'Operating System', 'Computer Networks', 'Java', 'System Design', 'UI/UX', 'C++']

    const dispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()
    const course = location?.state?.course
    const courseId = location?.state?.course?._id

    const toTitleCase = (str) => {
        if (str === null || str === undefined) return null
        else return str.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')
    }

    const [selectedCourseId] = useState(courseId)
    const editorRef = useRef(null);
    const category = toTitleCase(course?.category)


    const [courseDetail, setCourseDetail] = useState({ topic: course?.topic, thumbnail: course?.thumbnail, description: course?.description, category: category, price: course?.price, discount: course?.discount, level: course?.level, language: course?.language, createdBy: course?.createdBy})

    const [previewThumbnail, setPreviewThumbnail] = useState(course?.thumbnail?.secure_url)

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

    const handleEditorChange = () => {
        if (editorRef.current) {
            const courseContent = editorRef.current.getContent()
            setCourseDetail({...courseDetail,description:courseContent})
        }
    };

    const handleRemoveThumbnail = (e) => {
        e.preventDefault()
        setPreviewThumbnail(null)
        setCourseDetail({ ...courseDetail, thumbnail: undefined })
    }



    const handleCancelEdit = (e) => {
        e.preventDefault()
        setCourseDetail({ topic: course?.topic, thumbnail: course?.thumbnail, description: course?.description, category: category, price: course?.price, discount: course?.discount, level: course?.level, language: course?.language, createdBy: course?.createdBy })

        setPreviewThumbnail(course?.thumbnail?.secure_url)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        //Validate the course Detals
        const { topic, category, description, price, discount, level, language } = courseDetail
        
        
        if (!topic || !category || !description || price === null || price === undefined || discount === null || discount === undefined || !level || !language) {
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

        if (description.length > 10000) {
            toast.error('Description Is Too Long')
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


        const thunkResponse = await (dispatch(editCourse({ formData, courseId })))
        if (thunkResponse?.payload?.Data) {
            console.log("Response : ", thunkResponse?.payload?.Data)

            const course = thunkResponse?.payload?.Data?.updatedCourse

            if (course) {
                console.log("Response: ", course)
                navigate(`/courseDetail`, { state: { course } });
            }
        } else {
            return
        }
    }

    const handleDeleteCourse = async (e) => {
        e.preventDefault()
        if (selectedCourseId) {
            const thunkResponse = await dispatch(deleteCourse(selectedCourseId))

            if (thunkResponse?.payload?.Data) {
                console.log("Data: ", thunkResponse?.payload?.Data)
                setTimeout(() => {
                    navigate('/myCourses')
                }, 2000)
            }
        } else {
            toast.error("CourseId Not Found")
        }
    }

    return (
        <HomeLayout>
            <div id='course-creation-page' className='mt-8 pb-24 pt-24'>

                <form onSubmit={handleFormSubmit} className="flex" >
                    <div id="newCourseInformation" className="mx-10 flex min-w-[50%] flex-col gap-y-8">

                        <h2 className="text-center text-2xl font-bold">Course Information</h2>
                        <label htmlFor="courseTitle">
                            <p className="mb-1 text-xl font-bold">Title</p>
                            <input onChange={handleInputChange} type="text" name="topic" value={courseDetail.topic} id="courseTitle" className="h-10 w-full rounded-lg px-5 text-lg" placeholder='e.g. The Ultimate Fullstack Web Development Bootcamp' />
                        </label>
                        <div className="flex w-full justify-between gap-x-3">

                            <label htmlFor="category" >
                                <p className="mb-1 text-xl font-bold">Category</p>
                                <select onChange={handleInputChange} name="category" value={courseDetail.category} id="category" className="h-10 w-56 rounded-lg text-center text-lg">
                                    <option value="" hidden>Select Category</option >
                                    {courseList.map((course) => <option key={course} value={course}>
                                        {course}
                                    </option>)}
                                </select>

                            </label>
                            <label htmlFor="level">
                                <p className="mb-1 text-xl font-bold">Level</p>
                                <select onChange={handleInputChange} name="level" value={courseDetail.level} id="level" className="h-10 w-56 rounded-lg text-center text-lg">
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
                            <div className='min-h-60'>
                                <Editor
                                    onChange={handleEditorChange}
                                    apiKey='yzox6ftijuiizet1be0qhundlf2qr3u0go75ectk6yzv891r'
                                    onInit={(_evt, editor) => editorRef.current = editor}
                                    initialValue={courseDetail.description}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                />
                             </div>
                        </label>



                    </div>
                    <div id="Thumnail-upload-container" className="flex w-[50%] flex-col gap-y-10 px-12">
                        <div className='thumbnail'>
                            <p className="mb-1 text-2xl font-bold">Thumbnail</p>
                            <label htmlFor="thumbnail" className='inline-block h-[18rem] w-[36rem] cursor-pointer border-2 border-dashed border-black'>
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

                        <div className="flex justify-between">
                            <label htmlFor="price">
                                <p className="mb-1 text-xl font-bold">Price (Rs.)</p>
                                <input onChange={handleInputChange} type="text" name="price" value={courseDetail?.price} id="price" className='h-10 rounded-lg text-center text-lg' defaultValue={0} />
                            </label>

                            <label htmlFor="discount">
                                <p className="mb-1 text-xl font-bold">Discount (%)</p>
                                <input onChange={handleInputChange} type="text" name="discount" value={courseDetail?.discount} id="discount" className='h-10 rounded-lg text-center text-lg' defaultValue={0} />
                            </label>
                        </div>

                        <label htmlFor="createdBy">
                            <p className="mb-8 text-xl font-bold">Course Creator</p>
                            <input onChange={handleInputChange} type="text" name="createdBy" id="createdBy" className='h-10 cursor-not-allowed rounded-lg text-center text-lg' value={courseDetail.createdBy} />
                        </label>
                        <div className="flex justify-between">

                            <button onClick={handleCancelEdit} className="btn btn-square h-12 w-32 rounded-xl bg-yellow-600 font-bold text-white hover:bg-yellow-700">Cancel Edit</button>
                            <button type='submit' className="btn btn-square h-12 w-32 rounded-xl bg-[#4A00FF] font-bold  text-white hover:bg-[#450cd6]">Save Changes</button>
                        </div>

                    </div>

                </form>

                <div className="mt-20 flex items-center justify-center gap-2">
                    <p className="text-lg text-red-700"><a href="#deleteCourseModel" className="flex items-center justify-center gap-x-1 text-lg font-semibold text-[#BF2735]"><img src={deleteLogo} alt="deleteLogo" className="h-5 w-5" /> Delete Course</a></p>
                </div>


                <div className="modal text-black" role="dialog" id="deleteCourseModel">
                    <div className="modal-box text-lg">
                        <h3 className="text-center  text-xl font-bold ">Are you sure you want to delete your course?</h3>
                        <p className="text-md pt-6 md:pl-5">You will lose all the lectures of the course.</p>
                        <p className="text-md md:pl-5">This action can not be undone.</p>
                        <div className="modal-action">
                            <div className=" mt-10 flex w-full items-center justify-around">

                                <button onClick={() => navigate(-1)} className=' btn-sqaure btn  mb-2  w-24 rounded-lg border-2   border-slate-700 bg-inherit text-xl text-slate-700 '>Cancel
                                </button>

                                <button onClick={handleDeleteCourse} className=' btn-sqaure w-46  btn btn-md  mb-2 rounded-lg border-none border-black  bg-red-700 text-lg text-white hover:bg-red-800'> Delete Course </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </HomeLayout>
    )
}

export default EditCourse