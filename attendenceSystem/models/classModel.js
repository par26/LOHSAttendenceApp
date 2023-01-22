//imports the mongoose library 
const mongoose = require("mongoose");

//imports schema
const Schema = mongoose.Schema;

/*
The class model is consisted of 
class_name
 students[]
admin
*/

const ClassSchema = Schema ({
  class_name: {type: String, required: true, maxLength: 100 },
  students: [{type: Schema.Types.ObjectId, ref: "Student"}],
  admin: {type: Schema.Types.ObjectId, ref: "Admin"},
  class_id: {type: String, required: true},
})


//exports the class schema to the database
module.exports = mongoose.model("Class", ClassSchema);

