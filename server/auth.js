"use strict";

let db = require('./mysqlhelper');

let addUser=(username,password)=>{
    let sql="INSERT INTO user (username,password) VALUES (?,?)";
    db.query(sql,[username,password])
    .then(result=>console.log("success"))
    .catch(()=>console.log("err"));
}

exports.addUser = addUser;
