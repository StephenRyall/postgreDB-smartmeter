const pgp = require('pg-promise')();
const fs = require('fs')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'
const db = pgp(connectionString)


const csv = require("csv-parser");

let insertArray = [];

let parser = csv({ delimiter: ',', columns: true, trim: true });

let meters = []
let batchNo = 1;

fs.createReadStream('./../final_dummy_07272018/final_dummy_07272018.csv')
    .pipe(parser)
    .on('data', function (meter) {
        // console.log(meter.dual_fuel_install)
        meters.push(meter);
        if (meters.length > 1000) {
            parser.pause();
            db.tx(t => {
                // const queries = meters.map((meter) => {
                //     // console.log(n)
                //     return t.one('INSERT INTO test1(map_id) VALUES($1)', [1])
                // })
                // console.log(meters)
                return t.batch(meters.map((meter, map_ID) => {
                    return t.none('INSERT INTO test2(map_ID) VALUES($1)', [map_ID])
                }))
            }).then(data => {
                console.log(`Batch ${batchNo} done`);
                meters = [];
                parser.resume();
                batchNo++
            }).catch(error => {
                console.log({ error })
            })


        }
        // console.log(meters.length)

    }

    )