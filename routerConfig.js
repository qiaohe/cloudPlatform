var authController = require('./controller/authController');
var thirdPartyController = require('./controller/thirdPartyController');
var hospitalController = require('./controller/hospitalController');
var patientController = require('./controller/patientController');
var deviceController = require('./controller/deviceController');
var medicalController = require('./controller/medicalController');
module.exports = [
    {
        method: "post",
        path: "/api/register",
        handler: authController.register
    },
    {
        method: "post",
        path: "/api/login",
        handler: authController.login
    },
    {
        method: "post",
        path: "/api/logout",
        handler: authController.logout,
        secured: "user"
    },
    {
        method: "post",
        path: "/api/resetPwd",
        handler: authController.resetPwd
    },
    {
        method: "get",
        path: "/api/sms/:mobile",
        handler: thirdPartyController.sendSMS
    },
    {
        method: "get",
        path: "/api/hospitals/search",
        handler: hospitalController.searchHospital,
        secured: "user"
    },
    {
        method: "get",
        path: "/api/hospitals",
        handler: hospitalController.getHospitals,
        secured: "user"
    }
];