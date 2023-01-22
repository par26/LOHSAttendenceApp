const Student = require(".../models/studentModel")


//Display detailed info about student
exports.student_get = (req, res) => {
  
  try {
  const studentModel = await Student().find();
  } catch(error) {
	 console.error(error)
    // handle the error
  }
}

//Displays the create student form
exports.student_create_get = (req, res) => {
  res.render("studentCreate");
}

//Handels the create student form's input
exports.student_create_post = (req, res) => {
   const studentModel = await Student().Create();
}


//Displays the update student form
exports.student_update_get = (req, res) => {
  
  
}

//Handles the update student form
exports.student_update_post = (req, res) => {
  
}


