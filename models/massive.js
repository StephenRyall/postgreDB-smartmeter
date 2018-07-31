const pgp = require('pg-promise')({ capSQL: true });
const fs = require('fs')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'
const db = pgp(connectionString)


const csv = require("csv-parse");

const columns = new pgp.helpers.ColumnSet([
    'dual_fuel_install', 'n', 'install_date', 'install_settled', 'map_id', "mpxn", "msn",
    "provider", "removal_status", "switch_date", "material", "rental_code", "fuel", "mod_sn"
], { table: 'test2' });


// db.tx('massive-insert', t => {
//     return t.sequence(index => {
//         return getNextData(t, index)
//             .then(data => {
//                 if (data) {
//                     const insert = pgp.helpers.insert(data, columns);
//                     // cosole.log(insert)
//                     return t.none(insert);
//                 }
//             });
//     });
// })
//     .then(data => {
//         console.log('Total batches:', data.total, ', Duration:', data.duration);
//     })
//     .catch(error => {
//         console.log(error);
//     });



function getNextData(t, pageIndex) {
    return new Promise((resolve, reject) => {
        let data = null;
        if (pageIndex < 999) {
            data = [];

            let parser = csv({ delimiter: ',', columns: true, trim: true, from: pageIndex * 1000, to: pageIndex * 1000 + 999 });

            fs.createReadStream('./../final_dummy_07272018/final_dummy_07272018.csv')
                .pipe(parser)
                .on('data', function (meter) {

                    data.push(meter);
                }
                )
                .on('end', function () {
                    console.log("SUP rata")
                    return resolve(data);
                })
        } else {
            return resolve(data)
        }

    })

}

getNextData(null, 998).then(data => { console.log(data) })

