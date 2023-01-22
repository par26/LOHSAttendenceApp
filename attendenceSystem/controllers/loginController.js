const Class = require(".../models/classModel.js")
const Student = require(".../models/studentModel.js")







function findStudent(userFirstName, userLastName, userPassword) {
  //query the student list to find student
  const query = async Student.find({ first_name: userFirstName, last_name:       
  userLastName});
  //check if the selected querie's password is the same as the user's inpu

  query.exec(function (err, student) {
    if (err) return next(err);
    
    else if(student.password != userPassword) {
    //log the error to the user
    } else {
      console.log("%s %s grade is: %s", student.first_name, student.last_name,
      student.grade)
    }
  });
  
}

