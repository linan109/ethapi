const BigNumber = require('bignumber.js');
const moment = require('moment');
const sendSync = require(__dirname + '/transfer');
const MongoClient = require('mongodb').MongoClient;
const accounts = require(__dirname + '/accounts');
const test = require('assert');
// Database Name
const dbName = 'cet';


var unit = new BigNumber(1 * (10 ** 18));
