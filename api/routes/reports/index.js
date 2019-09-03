module.exports = app => {
    require("./getReports")(app);
    require("./getReportsTodo")(app);
    require("./getReport")(app);
    require("./getNotifications")(app);
    require("./postReport")(app);
};