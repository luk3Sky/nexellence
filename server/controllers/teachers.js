'use strict';

let db = require('../mysqlhelper');

let findAll = (req, res, next) => {
    // let name = req.query.name;
    let sql = `SELECT id, first_name, last_name, address, city, zip, province, first_name || ' ' || last_name as name
        FROM teacher ORDER BY first_name, last_name`;
    db.query(sql)
        .then((result) => res.json(result))
        .catch(next);
};

let findById = (req, res, next) => {
    let id = req.params.id;
    let sql = `SELECT id, first_name, last_name, address, city, province, zip, title, phone, mobile_phone, email, pic
        FROM teacher WHERE id=?`;
    db.query(sql, [parseInt(id)])
        .then((teachers) => res.json(teachers[0]))
        .catch(next);
};

let createItem = (req, res, next) => {
    let teacher = req.body;
    let sql = `
        INSERT INTO teacher
            (first_name, last_name, address, city, province, zip, title, phone, mobile_phone, email, pic)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        RETURNING id`;
    db.query(sql, [
        teacher.first_name,
        teacher.last_name,
        teacher.address,
        teacher.city,
        teacher.province,
        teacher.zip,
        teacher.title,
        teacher.phone,
        teacher.mobile_phone,
        teacher.email,
        teacher.pic
    ])
        .then((result) => {
            res.json(result[0]);
        })
        .catch(next);
};

let updateItem = (req, res, next) => {
    let teacher = req.body;
    let sql = `UPDATE teacher SET first_name=?, last_name=?, address=?, city=?, province=?, zip=?, title=?, phone=?,
                mobile_phone=?, email=?, pic=? WHERE id=?`;
    db.query(sql, [
        teacher.first_name,
        teacher.last_name,
        teacher.address,
        teacher.city,
        teacher.province,
        teacher.zip,
        teacher.title,
        teacher.phone,
        teacher.mobile_phone,
        teacher.email,
        teacher.pic,
        teacher.id
    ])
        .then(() => res.send({ result: 'ok' }))
        .catch(next);
};

let deleteItem = (req, res, next) => {
    let teacherId = req.params.id;
    db.query('DELETE FROM teacher WHERE id=?', [teacherId], true)
        .then(() => res.send({ result: 'ok' }))
        .catch(next);
};

exports.findAll = findAll;
exports.findById = findById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
