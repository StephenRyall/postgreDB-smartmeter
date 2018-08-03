const pgp = require('pg-promise')();
const fs = require('fs')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'
const db = pgp(connectionString)

const Column = pgp.helpers.Column;

const firstCol = new Column([{
    name: "Accrual 10/08/2018",
    prop: 'accrual'
}], {
        table: "test2"
    })

db.tx('massive-insert', t => {
    return t.sequence(index => {
        return getNextData(t, index)
            .then(data => {
                if (data) {
                    const insert = pgp.helpers.insert(data, firstCol);
                    return t.none(insert);
                }
            });
    });
})
    .then(data => {
        // COMMIT has been executed
        console.log('Total batches:', data.total, ', Duration:', data.duration);
    })
    .catch(error => {
        // ROLLBACK has been executed
        console.log(error);
    });

function getNextData(t, pageIndex) {
    let data = null;
    if (pageIndex < 1000) {
        data = [];
        for (let i = 0; i < 10000; i++) {
            const idx = pageIndex * 10000 + i; // to insert unique product names
            data.push({
                accrual: 0.7
            });
        }
    }
    return Promise.resolve(data);
}




const csv = require("csv-parse");

let parser = csv({ delimiter: ',', columns: true, trim: true });

let meters = []
let batchNo = 1;
const columns = new pgp.helpers.ColumnSet([
    'dual_fuel_install', 'n', 'install_date', 'map_id', "mpxn", "msn",
    "supplier", "switch_date", "material", "rental_code"
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

