const Class = require(".../models/classModel.js")
const Admin = require(".../models/adminModel.js")



exports.login_get = (req, res) => {
  //render the login page
  res.render('login', { title: "login" });
}


exports.login_post = (req, res) => {
  //find the user by their email
  var admin = Admin.findOne({ email: req.body.email });

  if (admin.password != req.body.password) {
    res.send({ success: false, message: "Wrong password" });

  } else {
    //redirct the user to the admin's url
    res.redirect(admin.url);
  }
}


