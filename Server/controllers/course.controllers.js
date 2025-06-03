import cloudinary from 'cloudinary'
import fs from 'fs'
import mongoose from "mongoose"
import courseModel from "../models/course.model.js"
import userModel from '../models/user.model.js'
import { deleteVideoFromYoutube, updateVideoTitleFromYoutube, uploadToYoutube } from '../utils/manage_youtube_videos.js'


const createCourse = async (req, res, next) => {
    //get all the details about course from body
    // thumbnail from files

    const { topic, description, category, createdBy, creatorEmail } = req.body

    //if any empty field
    if (!topic || !description || !category || !createdBy || !creatorEmail || !req.file) {
        return res.sendError(400, "All Fields are Mandatory")
    }

    try {

        // convert category string in fix formate before saving into mongodb
        req.body.category = category.trim().replace(/\s+/g, '-').toLowerCase();

        const newCourse = await courseModel.create(req.body)

        if (!newCourse) {
            return res.sendError(400, "Error In Creating New Course, Please Try Again")
        }

        //Upload the thumbnail to Cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: "courseThumbnail",
            // transformation: [{ width: 1280, height: 720, }],
            context: { alt: "Coursethumbnail" }
        }, (err, result) => {
            if (err) {
                return res.sendError(400, "Error in Uploading Thumbnail to Cloudinary", err)
            } if (result) {
                // console.log(200, "Successfully Uploaded thumbnail to Cloudinary file Server")
            }
        })

        if (result) {
            // store the thumbnail information
            newCourse.thumbnail.public_id = result.public_id
            newCourse.thumbnail.secure_url = result.secure_url

            await newCourse.save()

            //Delete file from local storage
            fs.rmSync(req.file.path)

            // Save Course Details in the instructors data
            const instructorId = req?.user?.id
            const instructor = await userModel.findById(instructorId)
            instructor.createdCourses.push({ courseId: newCourse._id })
            await instructor.save()

            return res.success(200, "Course Created Successfully", newCourse)
        }

    } catch (error) {
        return res.sendError(400, "Error in Creating Course", error.message)
    }
}

const viewCourses = async (req, res, next) => {
    //Show all the courses in the dabasase

    try {
        const allCourses = await courseModel.find({})
        if (allCourses.length >= 0) {
            return res.success(200, "Fetch Courses Successfully", allCourses)
        } else {
            return res.sendError(400, "Error in Get Courses")
        }

    } catch (error) {
        return res.sendError(400, "Error In Fetch Courses from Database", error.message)
    }
}

const getCoursesByCategoryOrName = async (req, res) => {

    try {
        const { category, courseName } = req.body
        if (category) {
            const coursesList = await courseModel.find({ category })
            const formattedName = category.replace(/-/, " ").replace(/\b\w/g, char => char.toUpperCase());
            if (coursesList.length > 0) {
                return res.success(200, `Explore Our ${formattedName} Courses`, { Course: coursesList })
            } else {
                return res.success(200, "Currently We Don't Have Any Course For This Category")
            }
        }
        else if (courseName) {
            const course = await courseModel.find({ topic: courseName })
            if (course.length > 0) {
                return res.success(200, `Here Is Your ${courseName} Course`, { Course: course })
            } else {
                return res.success(200, "Currently We Don't Have Any Course For This Course Name")
            }
        } else {
            res.sendError(400, "No Category Or Course Name Provided")
        }

    } catch (error) {
        return res.sendError(400, "Error In Get Courses By Category Or Name", error.message)
    }

}

const fetchSubscribedCourses = async (req, res) => {

    try {

        // get the list of all course of the user
        const userId = req.user.id

        if (!userId) {
            return res.sendError(401, "Please Login And Try Again")
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.sendError(401, "Unauthorized User")
        }

        const courseIdList = user?.subscriptions?.filter((sub) => sub.subscription_status == 'active').map((sub) => sub.courseId)

        const subscribedCourses = await courseModel.find({ _id: { $in: courseIdList } })

        return res.success(200, "Fetch Subscribed Courses Successfully", subscribedCourses)

    } catch (error) {
        return res.sendError(400, "Error In fetching Subscribed Courses", error.message)
    }
}

const fetchCreatedCourses = async (req, res) => {
    try {
        const userId = req.user.id

        if (!userId) {
            return res.sendError(401, "Please Login And Try Again")
        }

        const user = await userModel.findById(userId)
        const creatorEmail = user?.email

        const courses = await courseModel.find({ creatorEmail })

        return res.success(200, "Fetched Created Courses Successfully", courses)

    } catch (error) {
        return res.sendError(400, "Error In fetching Created Courses", error.message)
    }
}

const updateCourse = async (req, res, next) => {

    try {
        const courseId = req.params.id


        const isValidCourseId = await mongoose.isObjectIdOrHexString(courseId)

        if (!isValidCourseId) {
            return res.sendError(400, "Invalid Course Id")
        }

        const Course = await courseModel.findById(courseId)
        if (!Course) {
            return res.sendError(404, "Course Doesn't Exist")
        }


        // fetch Details for updates
        if (Object.keys(req.body).length != 0) {

            // convert category string in fix formate before saving into mongodb
            const { category } = req.body

            if (category) {
                req.body.category = category.trim().replace(/\s+/g, '-').toLowerCase();
            }

            const { thumbnail, ...objectWithoutThumbnail } = req.body

            try {
                const UpdatedCourse = await courseModel.findByIdAndUpdate(courseId, { $set: objectWithoutThumbnail }, { new: true, runValidators: true })

            } catch (error) {
                return res.sendError(400, "Error In Updating Course Details")
            }

        } else {
            return res.success(200, "No Updation in Course", "No Value Provided For Updation")
        }

        //Now if Thumbnail is Provided for update 
        if (req.file) {

            // upload the thumbnail to Cloudinary and get publicId
            const result = await cloudinary.v2.uploader.upload(req.file.path,
                {
                    folder: "courseThumbnail",
                    // transformation: [{ width: 1280, height: 720, }],
                    context: { alt: "coursethumnail" }

                }
            )
            if (!result) {
                req.sendError(400, "Error in Uploading New thumnail To Cloudinary")
            } else {
                // console.log("New Thumbnail Uploaded To Cloudinary")
            }

            const newPublicId = result.public_id
            const newSecureUrl = result.secure_url

            //we will delete the old thumbnail from Cloudnary
            const oldPublicId = Course?.thumbnail?.public_id

            if (oldPublicId) {

                const deleteOldThumbnail = await cloudinary.v2.uploader.destroy(oldPublicId, (err, success) => {
                    if (err) {
                        // console.log("Error in Deleting Old thumbnail from Cloudinary ")
                    } else if (success && success.result == 'ok') {
                        // console.log("Deleted Old Thumbnail From Cloudinary")
                    }
                })

            } else {
                // console.log("Old thumbnail Doesn't exist")
            }

            // Update the Thumbnail public id, and secure url to New Public Id and  
            Course.thumbnail.public_id = newPublicId
            Course.thumbnail.secure_url = newSecureUrl

            const updatedCourse = await Course.save({ runValidators: true, new: true })

            return res.success(200, "Course Updated Successfully", { remark: "Thumbnail is Updated", updatedCourse: updatedCourse })
        } else {
            const updatedCourse = await courseModel.findById(courseId)

            return res.success(200, "Course Updated Successfully", { remark: "No Updation in Thumbnail", updatedCourse: updatedCourse })
        }

    } catch (error) {
        return res.sendError(400, "Error in Course Update", error.message)
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id
        if (!mongoose.isObjectIdOrHexString(courseId)) {
            return res.sendError(400, "Invalid Course Id", courseId)
        }

        const Course = await courseModel.findById(courseId)

        if (!Course) {
            return res.sendError(400, "No Course Exist For Given CourseId")
        }

        // We will delete all the lectures thumbnails and course thumbnail we had uploaded to cloudinary


        const thumbnailPublicId = await Course?.thumbnail?.public_id

        const remarks = []
        // delete course thumbnail
        if (thumbnailPublicId) {
            await cloudinary.v2.uploader.destroy(thumbnailPublicId)
            remarks.push("Deleted The Course Thumbnail from Cloudinary")
        } else {
            remarks.push("Thumbnail Of Course Doesn't exists on Cloudinary")
        }

        //delete All lecture thumbnail if exists
        const Lectures = Course?.lectures

        if (Lectures.length > 0) {

            //creating a list of publicId's of all lectures 
            const lectureIdList = Lectures.map((lecture) => {
                let lecturePublicId = lecture.thumbnail.public_id
                if (lecturePublicId) {
                    return lecturePublicId
                }
            })

            if (lectureIdList.length > 0) {
                const result = await cloudinary.v2.api.delete_resources(lectureIdList)

                if (!result) {
                    remarks.push("Error in Deleting Lecture thumbnail from Cloudinary")
                } else {
                    remarks.push("Deleted All The Lecture thumbnails from Cloudinary")
                }
            } else {
                remarks.push("No Thumbnail Of Any Lecture Exists on Cloudinary")
            }
        } else {
            remarks.push("No Thumbnail Of Any Lecture Exists on Cloudinary")
        }

        // Delete Course Details from the Instructor or Data
        const instructorId = req?.user?.id

        await userModel.updateOne(
            { _id: instructorId },
            { $pull: { createdCourses: { courseId: courseId } } }
        ).then((result) => {
            // console.log('courseDetails Removed From Instructor Data',result)
        }).catch((err) => {
            // console.log("Error In Remove the Course Data from Instructor")
        })

        // Delete course from Mongo
        const deletedCourse = await courseModel.findByIdAndDelete(courseId)

        return res.success(200, "Course Deleted Successfully", { Remark: remarks })

    } catch (error) {
        return res.sendError(400, "Error In Deleting Course", error.message)
    }
}

const addLecture = async (req, res, next) => {

    try {
        const courseId = req.params.id
        const isValidId = mongoose.isObjectIdOrHexString(courseId)
        if (!isValidId) {
            return res.sendError(400, "Invalid Course Id", courseId)
        }

        // collect Lecture Data from user
        if (Object.keys(req.body).length == 0) {
            return res.sendError(400, "Lecture Data Is Not Provided", req.body)
        }

        //Fetch Text details from  form data
        const { title, youtubeLink } = req.body

        //Title Not Provided
        if (!title) {
            return res.sendError(400, "Title Is Required")
        }



        //Title Not Provided
        if (!youtubeLink && !req.file) {
            return res.sendError(400, "Provide youtube link or upload a file")
        }

        const Course = await courseModel.findById(courseId)

        if (!Course) {
            return res.sendError(400, "Course Doesn't Exist, Please Create a New Course To Add Lecture")
        }



        //If video Is uploaded
        if (req.file) {

            // upload the video to youtube

            try {
                const response = await uploadToYoutube(req.file.path, title)

                if (response?.public_id) {
                    console.log("lecture video successfully uploaded to youtube")
                }

                if (response?.public_id) {
                    const public_id = response?.public_id
                    const secure_url = response?.secure_url

                    await Course.lectures.push({
                        ...req.body,
                        video: {
                            public_id,
                            secure_url
                        }
                    })

                    // update the number of lectures
                    Course.noOfLectures = await Course.lectures.length
                    await Course.save()

                    //remove video from the temporary upload folder
                    fs.rmSync(req.file.path)

                    return res.success(200, "Lecture Added Successfully", { Course: Course })
                }

            } catch (error) {
                return res.sendError(400, "Error in uploading video", error.message)
            }


        } else {

            try {
                await Course.lectures.push(req.body)
                await Course.save()

                return res.success(200, "Lecture Video Added Successfully", { Remarks: "No Video Uploaded, Video Link is Provided.", Course: Course })

            } catch (error) {
                return res.sendError(400, "Error In Saving Lecture Information", error.message)
            }
        }
    } catch (error) {
        return res.sendError(400, "Error In Adding Lecture Video", error.message)
    }
}

const getLectures = async (req, res, next) => {

    const courseId = req.params.id

    const isValidCourseId = mongoose.isObjectIdOrHexString(courseId)

    if (!isValidCourseId) {
        return res.sendError(400, "Invalid Course Id")
    }

    const Course = await courseModel.findById(courseId)

    if (!Course) {
        return res.sendError(400, "No Course Exist for Provided CourseId")
    }

    const lectures = Course.lectures
    if (!lectures) {
        return res.sendError(400, "No Lecture Exist For the Course")
    }
    return res.success(200, "Lectures Fetch Sucessfully", lectures)
}

const deleleLecture = async (req, res, next) => {

    try {

        const { courseId, lectureId } = req.params
        const Course = await courseModel.findById(courseId)

        if (!Course) {
            return res.sendError(404, "Course Doesn't Exist With Provided CourseId")
        }

        const lecture = await Course.lectures.id(lectureId)

        if (!lecture) {
            return res.sendError(400, "Lecture Doesn't Exit For This LectureId")
        }


        // Now First we will delete the Data Stored Cloudinary of this document
        const videoPublicId = lecture?.video?.public_id

        if (videoPublicId) {
            // delete video from the youtube 
            try {
                const response = await deleteVideoFromYoutube(videoPublicId);
            } catch (error) {
                console.log("Error in deleting video from youtube", error.message)
            }
        }

        //delete teh lecture
        await Course.lectures.pull({ _id: lectureId })

        //update the numberOfLectures for Course
        Course.noOfLectures = Course?.lectures?.length

        const updatedCourse = await Course.save()

        return res.success(200, "Lecture Deleted Successfully", updatedCourse)
    } catch (error) {
        return res.sendError(400, "Error In Deleting Lecture", error.message)
    }
}

const updateLecture = async (req, res, next) => {
    // We will take data as a form because User can request for the video to update
    // We only update video if Provided

    const { courseId, lectureId } = req.params
    const Course = await courseModel.findById(courseId)

    if (!Course) {
        return sendError(400, "Course Doesn't exist for Given CourseId", { CourseId: courseId })
    }

    const Lecture = await Course.lectures.id(lectureId)
    if (!Lecture) {
        return sendError(400, "Lecture Doesn't exist for Given LectureId", { LectureId: lectureId })
    }

    try {

        if (Object.keys(req.body).length != 0) {

            const updateData = req.body
            const { video, ...updateDataWithoutVideo } = req.body

            Object.keys(updateDataWithoutVideo).forEach((key) => {
                Lecture[key] = updateDataWithoutVideo[key]
            })

            await Course.save()

            // now update the title from the youtube video as well

            if (Lecture?.video?.public_id) {
                try {
                    await updateVideoTitleFromYoutube(Lecture?.video?.public_id, updateDataWithoutVideo['title'])
                } catch (error) {
                    console.log("Error in changing the title of the youtube video", error.message)
                }
            }


        } else {
            return res.sendError(400, "Please Send the Data in Multipart/Form-data", { "req.body:": req.body })
        }

        //Now if Video is Provided for update 

        if (req.file) {

            const result = await uploadToYoutube(req.file.path, req?.body?.title)

            const newPublicId = result.public_id
            const newSecureUrl = result.secure_url

            //we will delete the old thumbnail from Cloudnary
            const oldPublicId = Lecture?.video?.public_id

            if (oldPublicId) {
                try {
                    const result = await deleteVideoFromYoutube(oldPublicId)
                } catch (err) {
                    console.log("Error in Deleting Old Video from Youtube", err);
                }
            }

            // Update the Thumbnail public id to New Public Id, and Update the Secure Url also 
            Lecture.video.public_id = newPublicId
            Lecture.video.secure_url = newSecureUrl

            // Save all the Information of Course, Provided It follow the Validations
            const updatedCourse = await Course.save({ runValidators: true, new: true })

            return res.success(200, "Lecture Updated Successfully", updatedCourse)
        } else {
            const updatedCourse = await courseModel.findById(courseId)
            return res.success(200, "Lecture Updated Successfully { Video Is As Previous }", updatedCourse)
        }
    } catch (error) {
        return res.sendError(400, 'Error In Updating Lecture', error.message)
    }
}

const updateRating = async (req, res) => {

    const userId = req.user.id
    const { userRating, courseId } = req.body

    if (!userId) {
        return res.sendError("Please Logged And Try Again")
    }

    if (userRating === undefined || userRating === null) {
        return res.sendError(400, "Rating is Required")
    }
    if (userRating < 0 || userRating > 5) {
        return res.sendError(400, 'Rating Is Invalid, Rating Must Be Between 0 To 5', userRating)
    }

    if (!courseId) {
        return res.sendError(400, "CourseId Is Missing")
    }

    // check karo ki is user in pahle is course ke liye rating kari hai ki nai
    const course = await courseModel.findById(courseId)

    const courseObject = await course?.allRatings?.find((rating) => rating?.userId?.toString() === userId)

    if (!courseObject) {
        //Now User Never rated earlier to this course, so we will add the rating

        const newRating = {
            userId,
            value: userRating
        }
        course.allRatings.push(newRating)
        await course.save()
        return res.success(200, "Rating Added Successfully", course.allRatings)
    } else {
        // User Is trying to update the already existing Course Rating
        courseObject.value = userRating
        await course.save()
        return res.success(200, "Rating Added Successfully", course.allRatings)
    }
}



export {
    addLecture, createCourse, deleleLecture, deleteCourse, fetchCreatedCourses, fetchSubscribedCourses, getCoursesByCategoryOrName, getLectures,
    updateCourse, updateLecture, updateRating, viewCourses
}

