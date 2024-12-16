import { Router } from 'express'
import { addLecture, createCourse, deleleLecture, deleteCourse, fetchCreatedCourses, fetchSubscribedCourses, getCoursesByCategoryOrName, getLectures, updateCourse, updateLecture, updateRating, viewCourses } from '../controllers/course.controllers.js'
import isLoggedIn from '../middlewares/authentication.middleware.js'
import { authorizedRoles } from '../middlewares/authorization.middleware.js'
import upload from '../middlewares/multer.middleware.js'


const router = Router()

router.route('/')
    .post(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR', 'ADMIN'),
        upload.single('thumbnail'),
        createCourse
    )
    .get(
        viewCourses
    )

router.route('/courses/').post(getCoursesByCategoryOrName)

router.route('/subscribedCourses/').get(isLoggedIn, fetchSubscribedCourses)

router.route('/createdCourses/').get(isLoggedIn, fetchCreatedCourses)

router.route('/updateRating/').post(isLoggedIn, updateRating)




router.route('/:id')
    .get(
        isLoggedIn,
        getLectures
    )
    .put(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR', 'ADMIN'),
        upload.single('thumbnail'),
        updateCourse
    )
    .delete(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR', 'ADMIN'),
        deleteCourse
    )
    .post(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR', 'ADMIN'),
        upload.single('video'),
        addLecture
    )


router.route('/:courseId/:lectureId')
    .delete(
        isLoggedIn,
        authorizedRoles('INSTRUCTOR', 'ADMIN'),
        deleleLecture
    )
    .put(isLoggedIn,
        authorizedRoles('INSTRUCTOR', 'ADMIN'),
        upload.single('video'),
        updateLecture
    )

export default router







