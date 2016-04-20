"use strict";
var config = require('../config');
var i18n = require('../i18n/localeMessage');
var hospitalDAO = require('../dao/hospitalDAO');
var _ = require('lodash');
var Promise = require('bluebird');
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
        var pageIndex = +req.query.pageIndex;
        var pageSize = +req.query.pageSize;
        hospitalDAO.findAll({
            from: (pageIndex - 1) * pageSize,
            size: pageSize
        }).then(function (hospitals) {
            hospitals.pageIndex = pageIndex;
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
        var adminJobTitle = {};
        var adminRole = {};
        var jobTitle = {};
        hospitalDAO.insert(h).then(function (result) {
            h.id = result.insertId;
            return hospitalDAO.insertRole({hospitalId: h.id, name: '医生'});
        }).then(function (result) {
            return hospitalDAO.insertJobTitle({hospitalId: h.id, role: result.insertId, name: '主治医师'});
        }).then(function (result) {
            jobTitle = result.insertId;
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 4});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 5});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 35});
        }).then(function (result) {
            return hospitalDAO.insertRole({hospitalId: h.id, name: '挂号'});
        }).then(function (result) {
            return hospitalDAO.insertJobTitle({hospitalId: h.id, role: result.insertId, name: '导医挂号'});
        }).then(function (result) {
            jobTitle = result.insertId;
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 1});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 2});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 20});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 7});
        }).then(function (result) {
            return hospitalDAO.insertRole({hospitalId: h.id, name: '财务'});
        }).then(function (result) {
            return hospitalDAO.insertJobTitle({hospitalId: h.id, role: result.insertId, name: '财务收费'});
        }).then(function (result) {
            jobTitle = result.insertId;
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 1});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 2});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 28});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 29});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 31});
        }).then(function (result) {
            return hospitalDAO.insertRole({hospitalId: h.id, name: '药房'});
        }).then(function (result) {
            return hospitalDAO.insertJobTitle({hospitalId: h.id, role: result.insertId, name: '药房管理'});
        }).then(function (result) {
            jobTitle = result.insertId;
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 23});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 24});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 25});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 26});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: jobTitle, menuItem: 34});
        }).then(function (result) {
            return Promise.map([{enabled: 1, hospitalId: h.id, name: '08:00-09:00'},
                {enabled: 1, hospitalId: h.id, name: '08:00-09:00'},
                {enabled: 1, hospitalId: h.id, name: '09:00-10:00'},
                {enabled: 1, hospitalId: h.id, name: '10:00-11:00'},
                {enabled: 1, hospitalId: h.id, name: '11:00-12:00'},
                {enabled: 1, hospitalId: h.id, name: '12:00-13:00'},
                {enabled: 1, hospitalId: h.id, name: '13:00-14:00'},
                {enabled: 1, hospitalId: h.id, name: '14:00-15:00'},
                {enabled: 1, hospitalId: h.id, name: '15:00-16:00'},
                {enabled: 1, hospitalId: h.id, name: '16:00-17:00'},
                {enabled: 1, hospitalId: h.id, name: '17:00-18:00'},
                {enabled: 1, hospitalId: h.id, name: '18:00-19:00'},
                {enabled: 1, hospitalId: h.id, name: '19:00-20:00'}], function (period, index) {
                return hospitalDAO.insertShiftPeriod(period);
            }).then(function (result) {
                Promise.map([{hospitalId: h.id, type: 0, value: '每天1次'}, {hospitalId: h.id, type: 0, value: '每天2次'},
                    {hospitalId: h.id, type: 0, value: '每天3次'}, {
                        hospitalId: h.id,
                        type: 0,
                        value: '每天4次'
                    }, {hospitalId: h.id, type: 1, value: 1},
                    {hospitalId: h.id, type: 1, value: 2}, {hospitalId: h.id, type: 1, value: 3}, {
                        hospitalId: h.id,
                        type: 1,
                        value: 4
                    }], function (item) {
                    return hospitalDAO.insertDict(item);
                }).then(function (result) {
                    //res.send({ret: 0, data: h});
                })
            })
        }).then(function (result) {
            return hospitalDAO.insertRole({hospitalId: h.id, name: '系统管理员'});
        }).then(function (result) {
            adminRole = result.insertId;
            return hospitalDAO.insertJobTitle({hospitalId: h.id, role: result.insertId, name: '管理员'});
        }).then(function (result) {
            adminJobTitle = result.insertId;
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: adminJobTitle, menuItem: 10});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: adminJobTitle, menuItem: 11});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: adminJobTitle, menuItem: 13});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: adminJobTitle, menuItem: 14});
        }).then(function (result) {
            return hospitalDAO.insertJobTitleMenuItem({jobTitleId: adminJobTitle, menuItem: 21});
        }).then(function (result) {
            return hospitalDAO.insertEmployee({
                admin: 1,
                gender: 1,
                createDate: new Date(),
                hospitalId: h.id,
                name: '管理员',
                mobile: 'admin',
                password: '698d51a19d8a121ce581499d7b701668',
                headPic: 'http://7xrtp2.com2.z0.glb.qiniucdn.com/headPic.png',
                status: 0,
                role: adminRole,
                jobTitle: adminJobTitle
            });
        }).then(function (result) {
            h.admin = {
                admin: 1,
                gender: 1,
                createDate: new Date(),
                hospitalId: h.id,
                name: '管理员',
                mobile: 'admin',
                password: '698d51a19d8a121ce581499d7b701668',
                headPic: 'http://7xrtp2.com2.z0.glb.qiniucdn.com/headPic.png',
                status: 0
            };
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