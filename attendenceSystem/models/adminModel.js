/** 
* Admin model
/**@module adminModel 
*/
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

/**
*Represents an admin in the system.
*@typedef {Object} Admin
*@property {string} first_name - The first name of the admin.
*@property {string} last_name - The last name of the admin.
*@property {Array.<mongoose.Schema.Types.ObjectId>} students - An array of student object ids.
*@property {string} classId - The id of the admin's class.
*@property {Array.<mongoose.Schema.Types.ObjectId>} event - An array of event object ids.
*@property {string} email - The email of the admin.
*@property {Array.<string>} prizes - An array of prize names.
*@property {string} password - The password of the admin.
*/

const AdminSchema = Schema ({
  first_name: {type: String, required: true, maxLength: 100 },
  last_name: {type: String, required: true, maxLength: 100 },
  students: [{type: Schema.Types.ObjectId, ref: "Student"}],
  classId: {type: String, required: true},
  event: [{type: Schema.Types.ObjectId, ref: "Event"}],
  email: {type: String, required: true},
  prizes: [{type: String}],
  password: {type: String, required: true},
});


// Virtual for author's URL
AdminSchema.virtual("url").get(function () {
  return `/admin/${this._id}`;
});
  


//exports the admin module
module.exports = mongoose.model("Admin", AdminSchema);

