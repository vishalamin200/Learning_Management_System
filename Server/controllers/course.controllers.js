import cloudinary from 'cloudinary'
import fs from 'fs'
import mongoose from "mongoose"
import courseModel from "../models/course.model.js"


const createCourse = async (req, res, next) => {
    //get all the details about course from body
    // thumbnail from files

    const { topic, description, category, createdBy } = req.body

    //if any empty field
    if (!topic || !description || !category || !createdBy) {
        return res.sendError(400, "All Fields are Mandatory", req.body)
    }

    try {
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
                console.log(200, "Successfully Uploaded thumbnail to Cloudinary file Server")
            }
        })

        if (result) {
            // store the thumbnail information
            newCourse.thumbnail.public_id = result.public_id
            newCourse.thumbnail.secure_url = result.secure_url

            await newCourse.save()

            //Delete file from local storage
            fs.rmSync(req.file.path)
            console.log("Removed Thumbnail From Local Storage")

            return res.success(200, "Course Successfully Created", newCourse)
        }

    } catch (error) {
        return res.sendError(400, "Error in Creating Course", error.message)
    }
}

const viewCourses = async (req, res, next) => {
    //Show all the courses in the dabasase

    try {
        const allCourses = await courseModel.find({}).select('-lectures')
        if (allCourses.length >= 0) {
            return res.success(200, "Fetch Courses Successfully", allCourses)
        } else {
            return res.sendError(400, "Error in Get Courses")
        }

    } catch (error) {
        return res.sendError(400, "Error In Fetch Courses from Database", error.message)
    }
}

const updateCourse = async (req, res, next) => {

    try {
        const courseId = req.params.id

        const isValidCourseId = await mongoose.isObjectIdOrHexString(courseId)

        if (!isValidCourseId) {
            return res.sendError(400, "Invalid Course Id")
        }

        // fetch Details for updates
        if (Object.keys(req.body).length != 0) {
            try {
                const Course = await courseModel.findByIdAndUpdate(courseId, { $set: req.body }, { new: true, runValidators: true })

                await Course.save()
            } catch (error) {
                return res.sendError(400, "Error In Updating Course Details")
            }

        } else {
            res.success(200, "No Updation in Course", "No Value Provided For Updation")
        }

        console.log("req.file: ", req.file)


        const Course = await courseModel.findById(courseId)

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
                console.log("New Thumbnail Uploaded To Cloudinary")
            }

            const newPublicId = result.public_id

            //we will delete the old thumbnail from Cloudnary
            const oldPublicId = Course.thumbnail.public_id

            const deleteOldThumbnail = await cloudinary.v2.uploader.destroy(oldPublicId, (err, success) => {
                if (err) {
                    console.log("Error in Deleting Old thumbnail from Cloudinary ")
                } else if (success && success.result == 'ok') {
                    console.log("Deleted Old Thumbnail From Cloudinary")
                }
            })

            // Update the Thumbnail public id to New Public Id 
            Course.thumbnail.public_id = newPublicId

            const updatedCourse = await Course.save({ runValidators: true, new: true })

            return res.success(200, "Course Updated Successfully", updatedCourse)
        } else {
            return res.success(200, "Course Updated Successfully", { remark: "No Updation in Thumbnail", UpdatedCourse: Course })
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


        const thumbnailPublicId = await Course.thumbnail.public_id

        const remarks = []
        // delete course thumbnail
        if (thumbnailPublicId) {
            await cloudinary.v2.uploader.destroy(thumbnailPublicId)
            remarks.push("Deleted The Course Thumbnail from Cloudinary")
        } else {
            console.log(" Thumbnail Of Course Doesn't exists on Cloudinary")
            remarks.push("Thumbnail Of Course Doesn't exists on Cloudinary")
        }

        //delete All lecture thumbnail if exists
        const Lectures = Course.lectures

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
                    console.log("Error in Deleting Lecture thumbnail from Cloudinary")
                    remarks.push("Error in Deleting Lecture thumbnail from Cloudinary")
                } else {
                    console.log("Deleted All The Lecture thumbnails from Cloudinary")
                    remarks.push("Deleted All The Lecture thumbnails from Cloudinary")
                }
            } else {
                console.log("No Thumbnail Of Any Lecture Exists on Cloudinary")
                remarks.push("No Thumbnail Of Any Lecture Exists on Cloudinary")
            }
        } else {
            console.log("No Thumbnail Of Any Lecture Exists on Cloudinary")
            remarks.push("No Thumbnail Of Any Lecture Exists on Cloudinary")
        }

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
        if (!youtubeLink) {
            return res.sendError(400, "YoutubeLink Is Required")
        }

        const Course = await courseModel.findById(courseId)

        if (!Course) {
            return res.sendError(400, "Course Doesn't Exist, Please Create a New Course To Add Lecture")
        }


        //If thumbnail Is Provided
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "lecturesThumbnail",
                // transformation: [{ width: 1280, height: 720, }],
                context: { alt: "lectureThumbnail" }
            }, (err, result) => {
                if (err) {
                    return res.sendError(400, "Error In Lecture Upload")
                } if (result) {
                    console.log("Lecture Thumbnail Successfully Uploaded to Cloudinary")
                }
            })

            if (result) {
                const public_id = result.public_id
                const secure_url = result.secure_url
                await Course.lectures.push(
                    {
                        ...req.body,
                        thumbnail: { public_id, secure_url },
                    }
                )

                //UPdate the Number of Lectures After inserting a lectures
                Course.noOfLectures = await Course.lectures.length
                await Course.save()

                return res.success(200, "Lecture Added Successfully", {Course:Course.topic ,Lecture:Course.lectures.slice(-1)[0]})
            }
        } else {
            //Thumbnail Is not Provide, Save Only Lecture Details and Link

            try {
                await Course.lectures.push(req.body)
                await Course.save()

                return res.success(200, "Lecture Added Successfully", { Remarks: "No Thumbnail Provided",Course:Course.topic ,Lecture: Course.lectures.slice(-1)[0] })
            } catch (error) {
                return res.sendError(400, "Error In Saving Lectures Details")
            }
        }

    } catch (error) {
        return res.sendError(400, "Error In Adding Lecture", error.message)
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

    const { courseId, lectureId } = req.params
    const Course = await courseModel.findById(courseId)

    const lecture = await Course.lectures.id(lectureId)

    if (!lecture) {
        return res.sendError(400, "Lecture Doesn't Exsit")
    }

    // Now First we will delete the Data Stored Cloudinary of this document
    const thumbnailPublicId = lecture.thumbnail.public_id
    if (thumbnailPublicId) {

        await cloudinary.v2.uploader.destroy(thumbnailPublicId, (err, success) => {
            if (err) {
                console.log("Error In Deleting The thumbnail from Cloudinary: ", err.message)
            } else if (!success) {
                console.log("Lecture Thumbnail doesn't Exist in Cloudinary")
            }
            if (success && success.result === 'ok') {
                console.log("Lecture Thumbnail Deleted From Cloudinary")
            }
        })
    } else {
        console.log("Thumbnaail PublicId Doesn't exist Or Invalid")
    }

    //delete teh lecture
    const deletedLecture = await Course.lectures.pull({ _id: lectureId })

    //update the numberOfLectures for Course
    Course.noOfLectures = Course.lectures.length

    await Course.save()

    return res.success(200, "Lecture Deleted Successfully", deletedLecture)
}

const updateLecture = async (req, res, next) => {
    // We will take data as a form because User can request for the thumbnail to update
    // We only update thumbnail if Provided

    const { courseId, lectureId } = req.params
    const Course = await courseModel.findById(courseId)

    if (!Course) {
        return sendError(400, "Course Doesn't exist for Given CourseId", { CourseId: courseId })
    }

    const Lecture = await Course.lectures.id(lectureId)
    if (!Lecture) {
        return sendError(400, "Lecture Doesn't exist for Given LectureId", { LectureId: lectureId })
    }

    if (Object.keys(req.body).length != 0) {

        const updateData = req.body

        Object.keys(updateData).forEach((key) => {
            Lecture[key] = updateData[key]
        })

        await Course.save()
        console.log("Course Data Updated")

    } else {
        return res.sendError(400, "Please Send the Data in Multipart/Form-data", { "req.body:": req.body })
    }


    console.log("req.file: ", req.file)
    //Now if Thumbnail is Provided for update 
    if (req.file) {
        // upload the thumbnail to Cloudinary and get publicId

        const result = await cloudinary.v2.uploader.upload(req.file.path,
            {
                folder: "lecturesThumbnail",
                // transformation: [{ width: 1280, height: 720, }],
                context: { alt: "lecturethumnail" }

            }
        )
        if (!result) {
            req.sendError(400, "Error in Uploading New thumnail To Cloudinary")
        } else {
            console.log("New Thumbnail Uploaded To Cloudinary")
        }

        const newPublicId = result.public_id
        const newSecureUrl = result.secure_url

        //we will delete the old thumbnail from Cloudnary
        const oldPublicId = Lecture.thumbnail.public_id

        if(oldPublicId){
            try {
                const result = await cloudinary.v2.uploader.destroy(oldPublicId);
                if (result.result === 'ok') {
                    console.log("Deleted Old Thumbnail From Cloudinary");
                } else {
                    console.log("Failed to delete the old thumbnail");
                }
            } catch (err) {
                console.log("Error in Deleting Old thumbnail from Cloudinary", err);
            }   
        }

        // Update the Thumbnail public id to New Public Id, and Update the Secure Url also 
        Lecture.thumbnail.public_id = newPublicId
        Lecture.thumbnail.secure_url = newSecureUrl

        // Save all the Information of Course, Provided It follow the Validations
        const updatedCourse = await Course.save({ runValidators: true, new: true })
        const updatedLecture = await updatedCourse.lectures.id(lectureId)

        return res.success(200, "Lecture Updated Successfully", updatedLecture)
    } else {
        return res.success(200, "Lecture Updated Successfully {Thumbnail Isn't Update}",)
    }
}

export {
    addLecture, createCourse, deleleLecture, deleteCourse, getLectures,
    updateCourse, updateLecture, viewCourses
}

