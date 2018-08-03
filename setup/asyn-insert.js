const pgp = require('pg-promise')();
const fs = require('fs')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'
const db = pgp(connectionString)


const csv = require("csv-parse");

let parser = csv({ delimiter: ',', columns: true, trim: true });

let meters = []
let batchNo = 0;
let metercount = 0;
meters.push([]);

const columns = new pgp.helpers.ColumnSet([
    "map_id", "mpxn", "msn", "supplier", "rental_code"
], { table: 'test2' });

let donecount = 0;
console.time("Batch")
fs.createReadStream('./../final_dummy_07272018/final_dummy_07272018.csv')
    .pipe(parser)
    .on('data', function (meter) {
        meters[batchNo].push(meter);
        metercount++;

        if (metercount > 10000) {
            // parser.pause();
            meters.push([]);
            batchNo++;
            metercount = 0;

        }

        // console.log(meters.length)

    }
    )
    .on("end", () => {
        console.timeEnd("Batch")

        console.time("Batch1")
        for (let index = 0; index < batchNo; index++) {
            db.tx(t => {
                // console.log("Meter inserting ", index);

                const insert = pgp.helpers.insert(meters[index], columns);

                return t.none(insert)
            }).then(data => {
                //console.log(`Batch done`);
                donecount++;
                if (donecount == 104) {
                    console.timeEnd("Batch1")
                }
            }).catch(error => {
                console.log({ error })
            })

        }
    })


/*
    db.tx(t => {
        console.log("Meter inserting ", batchNo);
        batchNo++;
        const insert = pgp.helpers.insert(meter, columns);

        meters = [];

        return t.none(insert)
    }).then(data => {
        //console.log(`Batch ${batchNo} done`);
    }).catch(error => {
        console.log({ error })
    })
*/