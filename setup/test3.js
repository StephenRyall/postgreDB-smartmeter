const pgp = require('pg-promise')();
const fs = require('fs')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'
const db = pgp(connectionString)


const csv = require("csv-parse");

const Column = pgp.helpers.Column;

const thirdCol = new Column