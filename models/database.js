// const { Pool, Client } = require('pg')
const pgp = require('pg-promise')();
const fs = require('fs')
// const Papa = require('papaparse')
const connectionString = 'postgres://pomtech@db-qswe:Welcome2ES3@db-qswe.postgres.database.azure.com:5432/smartmeter?ssl=true'

// const pool = new Pool({
//     connectionString: connectionString,
// })

const db = pgp(connectionString)

// function Inserts(template, data) {
//     if (!(this instanceof Inserts)) {
//         return new Inserts(template, data);
//     }
//     this._rawType = true;
//     this.toPostgres = () => {
//         return data.map(d => '(' + pgp.as.format(template, d) + ')').join();
//     };
// }

// insert Template
// function Insert() {
//     return {
//         dual_fuel_install: null,
//         n: null,
//         install_date: null,
//         install_settled: null,
//         map_id: null,
//         mpxn: null,
//         msn: null,
//         supplier: null,
//         removal_status: null,
//         switch_date: null,
//         material: null,
//         Rental_Code: null,
//         fuel: full,
//         mod_sn: null
//     };
// };
// let readline = require('linebyline')

// const rl = readline("./../final_dummy_07272018/final_dummy_07272018.csv");

// let n = 0;
// const InsertArray = [];



// rl.on('line', function (line) {
//     // var insert = new Insert();
//     // n++;
//     // var InsertValues = line.split(',');
//     // if (InsertValues[0] !== '"dual_fuel_install"') { //skip first line
//     //     let i = 0;
//     //     for (let prop in insert) {
//     //         insert[prop] = (InsertValues[i] == '') ? insert[prop] : InsertValues[i];
//     //         i++;
//     //     }
//     //     InsertArray.push(insert);
//     //     if (n == 10000) {
//     //         rl.pause();
//     //         // convert insert array into one insert
//     //         const values = new Inserts(`${dual_fuel_install},${n},${install_date},${install_settled},${map_id},${mpxn},${msn},${supplier},${removal_status},${switch_date},${material},${Rental_Code},${fuel},${mod_sn}`, InsertArray);
//     //         db.none('INSERT INTO "DATA" (dual_fuel_install, n,install_date,install_settled,map_id,mpxn,msn,supplier,removal_status,switch_date,material,Rental_Code,fuel,mod_sn) VALUES $1', values)
//     //             .then(data => {
//     //                 n = 0;
//     //                 InsertArray = [];
//     //                 rl.resume();
//     //             })
//     //             .catch(error => {
//     //                 console.log(error);
//     //             });
//     //     }
//     // }
// });


// rl.on('close', function () {
//     console.log('end ' + n);
//     //last insert
//     if (n > 0) {
//         const values = new Inserts('${dual_fuel_install},${n},${install_date},${install_settled},${map_id},${mpxn},${msn},${supplier},${removal_status},${switch_date},${material},${Rental_Code},${fuel},${mod_sn}', InsertArray);
//         db.none('INSERT INTO "DATA" (dual_fuel_install, n,install_date,install_settled,map_id,mpxn,msn,supplier,removal_status,switch_date,material,Rental_Code,fuel,mod_sn) VALUES $1', values)
//             .then(data => {
//                 console.log('Last');
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
// });

// const getNextData = (index) => {
//     rl.on('line', (line, lineCount, byteCount) => {
//         console.log({ line, lineCount })
//     })
// }

// getNextData(1)
//     .createInterface({
//         input: require('fs').createReadStream('./../tests2.csv')
//     });

// let n = 0;

