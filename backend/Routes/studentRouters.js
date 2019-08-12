const express = require('express');
const router = express.Router();

const studentController = require('../API-Setup/studentController');

router.get('/fetchStudentProfile', studentController.student);

router.post('/studentLogin', studentController.login);

router.post('/registerStudentProfile', studentController.student_register_post);

module.exports = router;