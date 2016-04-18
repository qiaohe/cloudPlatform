"use strict";
var config = require('../config');
var redis = require('../common/redisClient');
var i18n = require('../i18n/localeMessage');
var hospitalDAO = require('../dao/hospitalDAO');
var medicalDAO = require('../dao/medicalDAO');
var _ = require('lodash');
var moment = require('moment');
var rongcloudSDK = require('rongcloud-sdk');
rongcloudSDK.init(config.rongcloud.appKey, config.rongcloud.appSecret);
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
    }
}