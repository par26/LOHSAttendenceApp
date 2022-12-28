const mongoose = require("mongoose");


const Schema = mongoose.Schema;


/* attendnce record has: 
  id
  class (the one it's associated with)
  start date
  end date
*/

const attendenceRecordSchema = Schema ({
  id: {type: String, required: true},
  class_id: {type: Schema.Types.ObjectId, ref: "Class"},
  start_date: {type: Date},
  end_date: {type: Date},
})


module.exports = mongoose.model("AttendenceRecod",  attendenceRecordSchema);