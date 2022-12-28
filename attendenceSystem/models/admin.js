const mongoose = require("mongoose");


const Schema = mongoose.Schema;


/*
the admin model consist of 
first name
last name
classes
email
password
*/
const AdminSchema = Schema ({
  first_name: {type: String, required: true, maxLength: 100 },
  last_name: {type: String, required: true, maxLength: 100 },
  classes: [{type: Schema.Types.ObjectId, ref: "Class"}],
  email: {type: String, required: true},
  password: {type: String, required: true},
});



//exports the admin module
module.exports = mongoose.model("Admin", AdminSchema);

