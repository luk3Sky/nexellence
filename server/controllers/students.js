'use strict';

let db = require('../mysqlhelper');

let findAll = (req, res, next) => {
    let name = req.query.name;
    let params = [];
    let sql;
    if (name) {
        sql = `
            SELECT id, first_name || ' ' || last_name AS name FROM student
            WHERE lower(first_name) || ' ' || lower(last_name) LIKE ? ORDER BY last_name, first_name LIMIT 20`;
        params.push('%' + name.toLowerCase() + '%');
    } else {
        sql = `SELECT id, first_name, last_name, address, city, province FROM student ORDER BY last_update DESC LIMIT 20`;
    }
    db.query(sql, params)
        .then((result) => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = 'SELECT * FROM student WHERE id=?';
    db.query(sql, [parseInt(id)])
        .then((students) => res.json(students[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let student = req.body;
    let sql = `
        INSERT INTO student
            (first_name, last_name, address, city, province, zip, dob, phone, mobile_phone, email, pic)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        RETURNING id`;
    db.query(sql, [
        student.first_name,
        student.last_name,
        student.address,
        student.city,
        student.province,
        student.zip,
        student.dob,
        student.phone,
        student.mobile_phone,
        student.email,
        student.pic
    ])
        .then((result) => {
            res.json(result[0]);
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let student = req.body;
    let sql = `UPDATE student SET first_name=?, last_name=?, address=?, city=?, province=?, zip=?, dob=?, phone=?,
                mobile_phone=?, email=?, pic=?, last_update=current_timestamp WHERE id=?`;
    db.query(sql, [
        student.first_name,
        student.last_name,
        student.address,
        student.city,
        student.province,
        student.zip,
        student.dob,
        student.phone,
        student.mobile_phone,
        student.email,
        student.pic,
        student.id
    ])
        .then(() => res.send({ result: 'ok' }))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let studentId = req.params.id;
    db.query('DELETE FROM student WHERE id=?', [studentId], true)
        .then(() => res.send({ result: 'ok' }))
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
