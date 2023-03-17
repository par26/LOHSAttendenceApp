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


/**
*Represents the student in the system.
*@typedef {Object} Student
*@property {string} first_name - The first name of the student
*@property {string} last_name - The last name of the student
*@property {string} email - The email of the student
*@property {int} grade- The grade of the student
*@property {int} points - The points of the student
*@property {mongoose.Schema.Types.ObjectId} admin - The admin id of the admin assigned to the student
*/
const StudentSchema = Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true, maxLength: 100 },
  grade: { type: Number, required: true },
  points: { type: Number },
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
})


// Virtual for author's URL
StudentSchema.virtual("url").get(function() {
  return `/student/${this._id}`;
});



module.exports = mongoose.model("Student", StudentSchema);

