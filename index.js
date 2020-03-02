/**
 * Remove recordings with date range.
 *  
 */
'use strict';

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const moment = require('moment');

const START_DATE = moment(process.env.START_DATE);      // Range start
const END_DATE = moment(process.env.END_DATE);          // Range end

const delLoop = (targetDate => {
    let _targetDate = targetDate || START_DATE;

    // Extract data fro one day.
    client.recordings.list({
        dateCreated: _targetDate.toDate()
    })
    .then(recordings => {
        // Remove the retrieved list.
        recordings.forEach(async r => {
            await client.recordings(r.sid).remove();
            console.log(`${r.sid} ${r.dateCreated} deleted.`);
        });

        // If the end date has not been reached, call it recursively.
        if (_targetDate.isBefore(END_DATE)) {
            _targetDate = _targetDate.add(1, 'days');
            delLoop(_targetDate);
        }
    })
    .catch(err => {
        console.log(err);
    })
});

delLoop();
