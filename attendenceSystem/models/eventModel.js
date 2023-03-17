/**@module eventModel 
*/
const mongoose = require("mongoose");


const Schema = mongoose.Schema;


/**
*Represents an event record in the system.
*@typedef {Object} Event
*@property {string} name - The name of the event.
*@property {string} description - Description of the event
*@property {string} date- Date of the event
*@property {string} start_time - The start time of the event
*@property {string} end_time - The end time of the event
*@property {string} event_type - Whether the event is sporting or not
*@property {int} password - The number of points asigned to the event
*@property {Array.<mongoose.Schema.Types.ObjectId>} students - An array of student object ids present in the event.
*/
const eventSchema = Schema ({
  name: {type: String},
  description: {type: String},
  date: {type: String},
  start_time: {type: String},
  end_time: {type: String},
  event_type: {type: String},
  points: {type: Number},
  students: [{type: Schema.Types.ObjectId, ref: "Student"}],
})


module.exports = mongoose.model("event",  eventSchema);