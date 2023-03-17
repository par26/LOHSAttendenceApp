const express = require("express");
const router = express.Router();


const event_controller = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/eventController');
const student_controller = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/studentController');

/* GET users listing. */


router.get("/", student_controller.student_index);



module.exports = router;







