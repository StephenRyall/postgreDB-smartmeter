const pgp = require('pg-promise')();
const fs = require('fs')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'
const db = pgp(connectionString)


const csv = require("csv-parse");

let parser = csv({ delimiter: ',', columns: true, trim: true });

let meters = []
let batchNo = 1;
const columns = new pgp.helpers.ColumnSet([
    'dual_fuel_install', 'n', 'install_date', 'install_settled', 'map_id', "mpxn", "msn",
    "provider", "removal_status", "switch_date", "material", "rental_code", "fuel", "mod_sn"
], { table: 'test2' });

console.time("Batch")
fs.createReadStream('./../final_dummy_07272018/final_dummy_07272018.csv')
    .pipe(parser)
    .on('data', function (meter) {
        meters.push(meter);
        if (meters.length > 10000) {
            parser.pause();
            db.tx(t => {
                const insert = pgp.helpers.insert(meters, columns);
                return t.none(insert)
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
    .on("end", () => {
        console.timeEnd("Batch")

    })

