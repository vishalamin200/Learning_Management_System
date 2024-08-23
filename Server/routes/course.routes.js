import express from 'express'
import { Router } from 'express'
import { createCourse, viewCourses, getLectures, updateCourse, deleteCourse, addLecture, deleleLecture, updateLecture, getCoursesByCategoryOrName } from '../controllers/course.controllers.js'
import upload from '../middlewares/multer.middleware.js'
import isLoggedIn from '../middlewares/user.middleware.js'
import { authorizedRoles, isSubscribed } from '../middlewares/auth.middleware.js'


const router = Router()

router.route('/')
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    )

    .get(
        viewCourses
    )

router.route('/courses/').post(getCoursesByCategoryOrName)


router.route('/:id')
    .get(
        isLoggedIn,
        isSubscribed,
        getLectures
    )
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        deleteCourse
    )
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        addLecture
    )




router.route('/:courseId/:lectureId')
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        deleleLecture
    )
    .put(isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        updateLecture
    )

export default router







