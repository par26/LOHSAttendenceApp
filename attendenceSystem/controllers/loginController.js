/** 
* Login Controller
*@module loginController
*/

const Student = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/studentModel')
const Admin = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/adminModel')




/**
 * @function login_get
 * @description Displays a login page for admin
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.login_get = (req, res) => {
  //render the login page
  res.render('login', { title: "login" });
}


/**
 * @function login_post
 * @description Proccesses the login page for admin
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.login_post = (req, res, next) => {
    //checks if the body input field is empty
    if(req.body.password == "") {
      res.render('login', {error: "Invalid Password"});
    }
    //find the user by their email
    var admin = Admin.findOne({ email: req.body.email }).exec( (err, admin) => {

        //checks if the admin exists      
        if(err || admin == null) {
          console.log("email error");
           res.render('login', {error: "Invalid Email"});
        }
    
        //checks if the admin's password is the same  
        else if (admin.password !== req.body.password) {
          console.log("password error")
          res.render('login', {error: "Invalid Password"}); 
        } 

        else {
          //save admin session variables
          req.session.loggedin = true;
          req.session.adminId = admin._id;  
          //redirct the user to the admin's url
          res.redirect("/admin");
        }
    });

} 

 

/**
 * @function student_login_get
 * @description Displays a login page for the student
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_login_get = (req, res) => {
  //render the student login page
  res.render('studentLogin', { title: "Student Login" });
}


/**
 * @function login_get
 * @description Proccesses the login page for student
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.student_login_post = (req, res) => {
  //finds the Student based on the class id
  var student = Student.findOne({email: req.body.email}).exec (
    function(err, student) {
      //checks if the student exists
       if(err || student == null) {
          console.log("email error");
           res.render('studentLogin', {error: "Invalid Email"});
        }
      
        else {
        //saves the student variables
         req.session.loggedin = true;
         req.session.studentId = student._id;
         req.session.adminId = student.admin;
         //redirects the student to the student url
        res.redirect("/student");
      }
    }
  )
  
}
