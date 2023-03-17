const express = require("express");
const router = express.Router();

const event_controller = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/eventController');
const student_controller = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/studentController');
const admin_controller = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/adminController');
const report_controller = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/reportController');


//presents a defualt page for the admin
router.get("/", admin_controller.admin_Index);


//lists the students in the class
router.get("/leaderboard", event_controller.class_leaderboard);

//route for recieving the sudent create page
router.get("/createStudent", student_controller.student_admin_create_get);
//route for proccessing the sudent create page
router.post("/createStudent", student_controller.student_admin_create_post);

//GET route for creating an event
router.get("/createEvent", event_controller.class_event_create_get);
//POST route for creating an event
router.post("/createEvent", event_controller.class_event_create_post);


//GET Route for generating report
router.get("/generateReport", report_controller.generate_report_get);

//GET route for help menu
router.get('/helpMenu', function(req, res, next) {
  res.render('helpMenu');
});

module.exports = router;

