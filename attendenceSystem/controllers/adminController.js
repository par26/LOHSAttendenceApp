/** 
* Admin Controller
*@module adminController
*/
const Admin = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/adminModel')
const Event = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/eventModel')

/**
 * @function admin_Index
 * @description This function renders the admin index page using data from the admin model.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.admin_Index = function(req, res) {
  console.log("admin index");
  
  Admin.findById(req.session.adminId, async function(err, admin) {

    var events = [];
    
    if (err) {
      res.send(err)
    } else {

      if(admin.event) {
         //loops through all the events in the admin's events array
        for(var i = 0; i < admin.event.length; i++) {
            //finds the event object and stores it into student variable
            const event = await Event.findById(admin.event[i]).exec();
            //adds the event variable to the array
            events.push(event);
          }
      }
      
    }
    
      res.render('adminIndex', {
        admin: admin,
        events: events,
      });
    });

}


/**
 * @function admin_Index
 * @description This function renders the admin index page using data from the admin model.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.admin_create_get = function(req, res) {
  res.render('userCreate');
  console.log("hello");
}


exports.admin_create_post = function(req, res) {
  console.log(req);

  
  var classId = generateClassId(6);

  
  var adminModel = new Admin({
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    classId: classId,
  });

  

  adminModel.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful 

      req.session.adminId = adminModel._id;
      res.redirect("/admin");
  });
}

/*
function for generating class Id
takes in idLength{int} 
outputs the random id string */
function generateClassId(idLength) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';

  for(var i = 0; i < idLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));

  }

  return result;
}
