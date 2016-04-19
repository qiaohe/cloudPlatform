"use strict";
var db = require('../common/db');
var sqlMapping = require('./sqlMapping');
module.exports = {
    insert: function (hospital) {
        return db.query(sqlMapping.hospital.insert, hospital);
    },
    update: function (hospital) {
        return db.query(sqlMapping.hospital.update, [hospital, hospital.id]);
    },
    findById: function (hospitalId) {
        return db.query(sqlMapping.hospital.findById, hospitalId);
    },
    searchHospital: function (name, page) {
        return db.query('select * from Hospital where name like \'%' + name + '%\' limit ' + page.from + ',' + page.size);
    },

    findAll: function (page) {
        return db.query(sqlMapping.hospital.findAll, [page.from, page.size])
    },
}
