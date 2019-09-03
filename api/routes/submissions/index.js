module.exports = app => {
    require("./getSubmissions")(app);
    require("./deleteSubmission")(app);
    require("./postSubmissions")(app);
    require("./postApprovals")(app);
    require("./postRejected")(app);
};