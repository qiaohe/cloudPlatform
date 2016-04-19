"use strict";
var config = require('../config');
var i18n = require('../i18n/localeMessage');
var hospitalDAO = require('../dao/hospitalDAO');
var _ = require('lodash');
var moment = require('moment');
module.exports = {
    searchHospital: function (req, res, next) {
        hospitalDAO.searchHospital(req.query.name, {
            from: req.query.from,
            size: req.query.size
        }).then(function (hospitals) {
            if (!hospitals) return res.send({ret: 0, data: []});
            return res.send({ret: 0, data: hospitals});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    search: function (req, res, next) {
        var data = {};
        hospitalDAO.searchHospital(req.query.name, {from: 0, size: 3}).then(function (hopitals) {
            data.hopitals = hopitals;
            return hospitalDAO.searchDoctor(req.query.name, {from: 0, size: 3});
        }).then(function (doctors) {
            data.doctors = doctors;
            return res.send({ret: 0, data: data});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },

    getHospitals: function (req, res, next) {
        hospitalDAO.findAll({from: req.query.from, size: req.query.size}).then(function (hospitals) {
            return res.send({ret: 0, data: hospitals});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    addHospital: function (req, res, next) {
        var h = req.body;
        h.createDate = new Date();
        h.enabled = 1;
        hospitalDAO.insert(h).then(function (result) {
            h.id = result.insertId;
            res.send({ret: 0, data: h});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    updateHospital: function (req, res, next) {
        var h = req.body;
        h.updateDate = new Date();
        hospitalDAO.update(h).then(function (result) {
            return hospitalDAO.findById(h.id);
        }).then(function (hospitals) {
            res.send({ret: 0, data: hospitals[0]});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    }
}