var authController = require('./controller/authController');
var thirdPartyController = require('./controller/thirdPartyController');
var hospitalController = require('./controller/hospitalController');
module.exports = [
    {
        method: "get",
        path: "/api/sms/:mobile",
        handler: thirdPartyController.sendSMS
    },
    {
        method: "get",
        path: "/api/hospitals/search",
        handler: hospitalController.searchHospital
    },
    {
        method: "get",
        path: "/api/hospitals",
        handler: hospitalController.getHospitals
    },
    {
        method: "post",
        path: "/api/hospitals",
        handler: hospitalController.addHospital
    },
    {
        method: "put",
        path: "/api/hospitals",
        handler: hospitalController.updateHospital
    }
];