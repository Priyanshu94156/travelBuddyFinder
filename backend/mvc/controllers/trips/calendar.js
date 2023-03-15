const {google} = require('googleapis');
require('dotenv').config();

//configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};


// Event for Google Calendar
function updateCalendar(tripName,description,startDate,endDate,owner){
let add = 'T00:00:00.000Z'
    // let tripSummary=tripName
// let description=description
let startDates=startDate+add
let endDates=endDate+add
// let owner=owner
console.log(tripName,description,startDate,endDate,owner)
let descriptionPlusOwner =description+"||"+owner

let event = {
    'summary': `${tripName}`,
    'description': `${descriptionPlusOwner}`,
    'PostedBy':`${owner}`,
    'start': {
        'dateTime': startDates,
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': endDates,
        'timeZone': 'Asia/Kolkata'
    }
};

insertEvent(event)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
}


module.exports = {updateCalendar}