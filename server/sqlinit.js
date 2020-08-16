/* eslint-disable no-console */
'use strict';

let fs = require('fs'),
    path = require('path'),
    db = require('./mysqlhelper.js');

let filePath = path.join(__dirname, '../mysql.init.sql');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (err) {
        console.error(err);
    } else {
        db.query(data)
            .then(function () {
                console.log('MySQL tables successfully initialized');
            })
            // eslint-disable-next-line no-unused-vars
            .catch(function (error) {
                console.log('Error initializing MySQL tables');
                console.error(error);
            });
    }
});
