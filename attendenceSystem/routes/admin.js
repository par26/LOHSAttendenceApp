const express = require("express");
const router = express.Router();

const class_controller = require("...controllers/classController");
const student_controller = require("...controllers/studentController");



//presents a defualt page for the admin


//lists the students in the class
router.get("/:adminId/class/:id", class_controller.class_list);
//route for creating a class
router.get("/:adminId/classCreate/", class_controller.class_create_get);
//routes for handeling the creation of class
router.post("/:adminId/classCreate/", class_controller.class_create_post);
//route for getting a detailed view of student
router.get("/:adminID/student/:id", student_controller.student_get);
//route for recieving the sudent create page
router.get("/:adminID/createStudent/", student_controller.student_create_get); 
//route for proccessing the sudent create page
router.post("/:adminID/createStudent/", student_controller.student_create_post);


