/** 
* Report Controller
*@module reportController
*/
const Student = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/studentModel');
const Event = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/eventModel');
const Admin = require('/home/runner/LOHSAttendenceApp/attendenceSystem/models/adminModel');
const fs = require('fs');
const sprintf = require('sprintf-js').sprintf;

const folderPath = '/home/runner/LOHSAttendenceApp/attendenceSystem/public/reports';


/**
 * @function generates a report and sends the admin a report containing data
 * @description Generates the report data
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
exports.generate_report_get = async (req, res) => {
  //finds the admin
  const admin = await Admin.findById(req.session.adminId).exec();
  //gets the content from the createReport function
  const content = await createReport(admin, req);
  //gets the new report file from the createFile function
  const filePath = await createFile(admin.first_name, content);
  
  res.render('report', {
      content: content,
  });
}


/**
 * @function login_get
 * @description Displays a login page for admin
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {void}
 */
async function createReport(admin) {
  var reportString = '';

  var students = [];
  if (admin.students) {
    students = await getLeaderBoard(admin.students);
  }

  var events = [];
  if (admin.event) {
    events = await getEvents(admin.event);
  }

  // Print the leaderboard to the text file
  reportString += 'Leaderboard:\n'
  for (let i = 0; i < students.length; i++) {
    reportString += sprintf('%d. %s %s %d points\n', i + 1, students[i].first_name, students[i].last_name, students[i].points);
  }

  // Prints the events
  reportString += 'Leaderboard:\n'
  for (let i = 0; i < events.length; i++) {
    reportString += sprintf('%d. %s:\n', i + 1, events[i].name);
    reportString += sprintf('%s\n', events[i].description);
    reportString += sprintf('Number of Students: %d\n', events[i].students.length);
  }

  return reportString;
}

/**
 * @function getLeaderBoard
 * @description gets the student objects from the admin's array of students
 * @param {Array} students - Array of student objects
 * @returns {Array} -  the array of the leaderboard student objects
 */
async function getLeaderBoard(students) {
  const leaderboard = [];

  // Loops through all the students in the admin's student field array
  for (let i = 0; i < students.length; i++) {
    // Finds the student object and stores it into student variable
    const student = await Student.findById(students[i]).exec();
    // Adds the student variable to the array
    leaderboard.push(student);
  }

  leaderboard.sort((a, b) => {
    return b.points - a.points;
  });

  return leaderboard;
}

/**
 * @function getEvents
 * @description gets the event object from the admin's array of events
 * @param {Array} events - Array of the event objects
 * @returns {Array} -  the array of admin's event objects
 */
async function getEvents(events) {
  const eventArray = [];

  for (let i = 0; i < events.length; i++) {
    const event = await Event.findById(events[i]).exec();
    eventArray.push(event);
  }

  eventArray.sort((a, b) => {
    return b.students.length - a.students.length;
  });

  return eventArray;
}


  /**
 * @function createFile
 * @description creates the file using the admin's firstname and the report content
 * @param {string} adminFirstName - admin's First Name string
 * @param {string} content -  the report's content
 * @returns {string} - the file path of the report
 */
async function createFile(adminFirstName, content) {0
  const filePath = folderPath.concat('/', adminFirstName, '.txt');
  
  // Create the file and write the content to it
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`File created successfully at ${filePath}`);
    }
  });

  return filePath;
}