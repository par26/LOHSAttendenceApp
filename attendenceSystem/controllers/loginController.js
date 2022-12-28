const Class = recquire(".../models/class.js")
const Student = recquire(".../models/class.js")







function findStudent(userFirstName, userLastName, userPassword) {
  //query the student list to find student
  const query = async Student.find({ first_name: userFirstName, last_name:     userLastName});
  //check if the selected querie's password is the same as the user's input
  query.select("password");

  query.exec(function (err, student) {
    if (err) return next(err);
  // Prints "Space Ghost is a talk show host."
    else if(student.password != userPassword) {
    //log the error to the user
    } else {
      return true;
    }
  });
  
}

