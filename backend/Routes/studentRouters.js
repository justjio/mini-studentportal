const express = require('express');
const router = express.Router();

const studentController = require('../API-Setup/studentController');

router.get('/', studentController.student);

module.exports = router;