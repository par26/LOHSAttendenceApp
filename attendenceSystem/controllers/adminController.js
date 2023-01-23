const Admin = require('.../models/adminModel')



exports.admin_Index = function(req, res) {
  Admin.findById(req.adminId, function(err, admin) {
    if (err) {
      res.send(err)
    } else {
      res.render('admin/index', {
        title: 'Admin',
        admin: admin
      })
    }
  })

}


exports.admin_create_get = function(req, res) {
  res.render('adminCreate', {});
}

exports.admin_create_post = function(req, res) {
  var admin = new Admin({email: res.body.email, password: res.body.password, first_name:     res.body.firstName, last_name: res.body.lastName});

  try {
    const adminModel = await Admin.create(admin);
  } catch (error) {
    console.error(error);
  }
}