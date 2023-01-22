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