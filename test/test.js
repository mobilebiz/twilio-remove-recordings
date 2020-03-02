'use strict';

const assert = require('assert');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const moment = require('moment');

const START_DATE = moment(process.env.START_DATE);      // Range start
const END_DATE = moment(process.env.END_DATE);          // Range end

describe('Check the parameters', () => {
    it("ACCOUNT_SID", () => {
        assert.ok(accountSid.length === 34, 'ACCOUNT_SIDの長さが不正です');
        assert.ok(accountSid.slice(0,2) === 'AC', 'ACCOUNT_SIDの形式が不正です');
    });
    it("AUTH_TOKEN", () => {
        assert.ok(authToken.length === 32, 'AUTH_TOKENの長さが不正です');
    });
    it("API Call", async () => {
        await client.api.accounts(accountSid).fetch()
        .then(account => {
            assert.ok(account.status === 'active', 'アカウントがアクティブではありません');
        })
        .catch(err => {
            throw (`API Call failed. ${err}`);
        });
    });
    it('Start date must by before or equal end date.', () => {
        assert.ok(START_DATE.isBefore(END_DATE) || START_DATE.isSame(END_DATE), 'START_DATEはEND_DATEより前でなくてはいけません');
    });
});
