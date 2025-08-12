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

const { execSync } = require("child_process");

const START_DATE = moment(process.env.START_DATE); // Range start
const END_DATE = moment(process.env.END_DATE); // Range end

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec)); // タイマー

let max_recording = 0;

const delLoop = (targetDate) => {
  let _targetDate = targetDate || START_DATE;

  // Extract data fro one day.
  client.recordings
    .list({
      dateCreated: _targetDate.toDate(),
    })
    .then(async (recordings) => {
      if (recordings.length > 0) {
        console.log(`🐞 ${_targetDate.format('YYYY-MM-DD')} ${recordings.length}`);
        execSync(`say ${_targetDate.format('YYYY-MM-DD')}は、${recordings.length}件です。`);

        if (max_recording < recordings.length) max_recording = recordings.length;
      }
      for (let r of recordings) {
        // if (r.channels === 1) {
        try {
          await client.recordings(r.sid).remove();
          console.log(`${r.sid} ${r.dateCreated} deleted.`);
          await sleep(20);
        } catch (err) {
          if (err && (err.status === 404 || err.code === 20404)) {
            console.warn(`${r.sid} ${r.dateCreated} not found (skipped).`);
            continue;
          }
          throw err;
        }
        // }
      }

      // If the end date has not been reached, call it recursively.
      if (_targetDate.isBefore(END_DATE)) {
        _targetDate = _targetDate.add(1, 'days');
        delLoop(_targetDate);
      } else {
        console.log(`max_recording: ${max_recording}`);
        execSync('say "削除が完了しました"');
      }
    })
    .catch((err) => {
      console.log(err);
      execSync('say "エラーが発生しました"');
    });
};

delLoop();
