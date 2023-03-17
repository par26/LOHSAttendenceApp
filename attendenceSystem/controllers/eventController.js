/** 
* Event Controller
*@module eventController
*/
const Student = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/studentModel')
const Event = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/eventModel')
const Admin = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/adminModel');

/**
 * @function class_leaderboard
 * @description Displays the leaderboard by loading the students property of admin and sorting it
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.class_leaderboard = (req, res) => {


  Admin.findById(req.session.adminId, async function(err, admin) {
     //array of students
    var students=[]; 
  
    if (err) {
      res.send(err)
    } else {
      
  
      if(admin.students) {
        //loops through all the students in the admin's student field array
        for(var i = 0; i < admin.students.length; i++) {
            //finds the student object and stores it into student variable
            const student = await  Student.findById(admin.students[i]).exec();
            //adds the stuent variable to the array
            students.push(student);
          }
      }
      
      students.sort((a, b) => {
        return b.points - a.points;
      });
      
      console.log(students);      
      res.render('leaderboard', {students: students});  

  }
  });
}



/**
 * @function class_event_create_get
 * @description Display event create form by loading and rendering the admin's students property 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.class_event_create_get = (req, res, next) => {

  

  Admin.findById(req.session.adminId, async function(err, admin) {
     //array of students
    var students=[]; 
  
    if (err) {
      res.send(err)
    } else {
      
  
      if(admin.students) {
        //loops through all the students in the admin's student field array
        for(var i = 0; i < admin.students.length; i++) {
            //finds the student object and stores it into student variable
            const student = await Student.findById(admin.students[i])
            //adds the stuent variable to the array
            if(student) {
            students.push(student);
            }
          }
      }
      

      console.log(students);      
      res.render('eventCreate', {students: students});  

    
    }
  });  

  
 
}



/**
 * @function class_event_create_post
 * @description Handels the createPost event
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */

exports.class_event_create_post = (req, res, next) => {
  
  //converts the student selection to an array 
  var students = req.body.student;

  if(!Array.isArray(students)) {
    if(typeof students === "undefined") {
    students = [];
    } else {
      students = [req.body.student];
    }

  } 

  console.log(students);
  
  //creates the event 
  var eventModel = new Event({ name: req.body.name, description: req.body.description, date: req.body.date, start_time: req.body.startTime, end_time: req.body.endTime,
event_type: req.body.eventType, points: req.body.points, students: students});

 eventModel.save((err, event) => {
      if (err) {
        return res.status(500).send(err)
      }
      // Successful 
      // Find the admin document by ID and append the new event id to the students array
      Admin.findByIdAndUpdate(req.session.adminId, { $push: {event: event._id } }, { new: true })
      .exec((err, admin) => {
        if (err) {
          return res.status(500).send(err)
        } 
      });

      //updates all the students's points
    addPoints(students, req.body.points);
    res.redirect("/admin");
  });
 

}




/**
 * @function addPoints
 * @description Adds the event's point value to all the students in the student array
 * @param {Array} students - The Array of Student Ids
 * @param {Object} points - The Number of Points 
 * @returns {void}
 */   
async function addPoints(students, points) {
  //checks if students is an array
  if(!Array.isArray(students)) {
    students = typeof students === "undefined" ? [] : [students];
  }
    for (var i = 0; i < students.length; i++) {
      const studentId = students[i];
      const update = { $inc: { points: points } };
      await Student.findByIdAndUpdate(studentId, update);
    }
   
}