const mongoose = require("mongoose");


const Schema = mongoose.Schema;

/*
The student model consisted of 
first_name
last_name
class id
grade
email
points
*/

const StudentSchema = Schema ({
  first_name: {type: String, required: true, maxLength: 100 },
  last_name: {type: String, required: true, maxLength: 100 },
  class_id: {type: Schema.Types.ObjectId, ref: "Class"},
  grade: {type: Number, required: true},
  email: {type: String, required: true},
  password:{ type: String, required: true},
  points: {type: Number},
})




module.exports = mongoose.model("Student", StudentSchema);

