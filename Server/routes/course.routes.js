import express from 'express'
import { Router } from 'express'
import { createCourse, viewCourses, getLectures, updateCourse, deleteCourse, addLecture, deleleLecture, updateLecture, getCoursesByCategoryOrName, fetchSubscribedCourses, updateRating, fetchCreatedCourses } from '../controllers/course.controllers.js'
import upload from '../middlewares/multer.middleware.js'
import isLoggedIn from '../middlewares/authentication.middleware.js'
import { authorizedRoles, isSubscribed } from '../middlewares/authorization.middleware.js'


const router = Router()

router.route('/')
    .post(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR','ADMIN'),
        upload.single('thumbnail'),
        createCourse
    )
    .get(
        viewCourses
    )

router.route('/courses/').post(getCoursesByCategoryOrName)

router.route('/subscribedCourses/').get(isLoggedIn,fetchSubscribedCourses)

router.route('/createdCourses/').get(isLoggedIn,fetchCreatedCourses)

router.route('/updateRating/').post(isLoggedIn,updateRating)


router.route('/:id')
    .get(
        isLoggedIn,
        getLectures
    )
    .put(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR','ADMIN'),
        upload.single('thumbnail'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR','ADMIN'),
        deleteCourse
    )
    .post(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR','ADMIN'),
        upload.single('video'),
        addLecture
    )


router.route('/:courseId/:lectureId')
    .delete(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR','ADMIN'),
        deleleLecture
    )
    .put(isLoggedIn,
        authorizedRoles('INSTRUCTOR','ADMIN'),
        upload.single('video'),
        updateLecture
    )

export default router







