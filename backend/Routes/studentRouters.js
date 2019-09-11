const express = require('express');
const router = express.Router();

const studentController = require('../API-Setup/studentController');


router.get('/getAllStudents', studentController.allStudents);

router.post('/fetchStudentProfile', studentController.student);

router.post('/studentLogin', studentController.login);

router.post('/registerStudentProfile', studentController.student_register_post);

router.post('/updateStudentProfile', studentController.student_update_post);

module.exports = router;