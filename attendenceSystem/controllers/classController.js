const Class = require(".../models/classModel")
const Student = require(".../models/studentModel")

//Display all of the students in the class by recieving the class model and loading the refrences of the student mode
exports.class_list = (req, res) => {

  //find the class acording to the url's id param
  class_id = req.params.id;

  //select the student refrence array and stores it as a
  const classQuery = await Class.findOne({ class_name: class_id, admin: req.adminId }).populate('students').exec();
  //array containing info of all the students in the class
  //stored as an array

  console.log(classQuery);
  //render the array of student
  res.render('classIndex', { students: classQuery.students });
}

/*Displays the create class form*/
exports.class_create_get = (req, res) => {
  //displays the create class form
  res.render('classCreate', {});
}

/*Handles the create class form*/
exports.class_create_post = (req, res) => {
  //creates a new document for the class
  var record = new Class({ class_name: res.body.name, admin: req.adminId });
  try {
    const classModel = await Class.create(record);
  } catch (error) {
    console.error(error)
    // handle the error
  }
}



exports.class_create_event_get = (req, res) => {

}

exports.class_create_event_post = (req, res) => {

}
