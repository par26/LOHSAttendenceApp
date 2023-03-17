var express = require('express');
var router = express.Router();
const adminController = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/adminController')

const studentController = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/studentController')

const loginController = require('/home/runner/LOHSAttendenceApp/attendenceSystem/controllers/loginController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
//GET handler for create account for the admin
router.get("/createAccount", adminController.admin_create_get);
//POST handler for create account for the admin
router.post("/createAccount", adminController.admin_create_post);

//GET handler for student create account
router.get("/createStudentAccount", studentController.student_create_get);
//POST handler for student create account
router.post("/createStudentAccount", studentController.student_create_post);

//GET handler for admin login page
router.get("/login", loginController.login_get);
//POST handler for admin login page
router.post("/login", loginController.login_post);

//GET handler for student login page
router.get("/studentLogin", loginController.student_login_get);
//POST handler for student login page
router.post("/studentLogin", loginController.student_login_post)



module.exports = router;
