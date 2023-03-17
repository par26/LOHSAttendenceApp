 /** 
* Student Controller
*@module studentController
*/

const Student = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/studentModel')
const Admin = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/adminModel')


/**
 * @function student_index
 * @description Displays the student's index page
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_index = (req, res) => {
  //finds the admin by id
    var student = Student.findById(req.session.studentId, async function(err, student) {
       
      res.render('studentIndex', {
        title: 'Student',
        points: student.points,
      });
    });

  }







//Display detailed info about student

/*
exports.student_get = (req, res) => {
  
  try {
  const studentModel = Student().find().exec();
  //find the admin
  //const adminModel;
  } catch(error) {
	 console.error(error)
    // handle the error
  }

  //render with the student and the admin events as parameters
}

*/

/**
 * @function student_create_get
 * @description Displays the student create form
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_create_get = (req, res) => {
  res.render('studentCreate');
}

/**
 * @function student_create_post
 * @description Handels the student create form
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_create_post = (req, res) => {

   //finds the Admin base on the class code
  var admin = Admin.findOne({classId: req.classCode}).exec();

  
  //checks if class code exists
  if(admin == null) {
    res.render('studentCreate', { error: "Invalid Class ID" });
  }

  //creates the student model object
  const studentModel = new Student ({
    first_name: req.body.first_name,
    last_name: req.body.last_name, 
    email: req.body.email, 
    password: req.body.password, 
    points: 0, 
    admin: admin
  });
  
  //saves the student model to the database
  studentModel.save((err, student) => {
      if (err) {
        return res.status(500).send(err)
      }
  
      // Find the admin document by ID and append the new student ID to the students array
      Admin.findByIdAndUpdate(admin._id, { $push: { students: student._id } }, { new: true })
      .exec((err, admin) => {
        if (err) {
          return res.status(500).send(err)
        } 
      });
      //redirects to the admin route  
      res.redirect("/admin");
  });
  
}


//Displays the update student form
exports.student_update_get = (req, res) => {
  
}

//Handles the update student form
exports.student_update_post = (req, res) => {
  
}

/**
 * @function student_admin_create_get
 * @description Displays the student create page on the admin's view
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_admin_create_get = (req, res) => {
  res.render('studentAdminCreate');
}

/**
 * @function student_admin_create_post
 * @description Handels the admin student create page
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_admin_create_post = (req, res, next) => {
  //takes the adminID
  var adminId = req.session.adminId;

  
  //creates a student model
  var studentModel = new Student({first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email, password: req.body.password, grade: req.body.grade, points: 0, admin: adminId});


  
  //saves the student model to the database
  studentModel.save((err, student) => {
      if (err) {
        return res.status(500).send(err)
      }
      //adds the student object to the admin's student array
      Admin.findByIdAndUpdate(adminId, { $push: { students: student._id } }, { new: true })
      .exec((err, admin) => {
        if (err) {
          return res.status(500).send(err)
        } 
      });
      //redirects to the admin page
      res.redirect("/admin");
  });
  
}

