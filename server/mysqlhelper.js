"use strict";

let mysql = require('mysql'),
    config = require('./config');

const connection = mysql.createConnection(config);

connection.connect(config, function (err) {
    if (err) throw(err);
    // eslint-disable-next-line no-console
    console.log('Connected to the MySQL server.');
});

module.exports.query = function (sql, values, singleItem, dontLog) {
    // if (!dontLog) {
    //     console.log(sql, values);
    // }

    return new Promise((resolve, reject) => {

        try {
            connection.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(singleItem ? results.rows[0] : results);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};