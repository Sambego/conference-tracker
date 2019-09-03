module.exports = app => {
    require("./deleteSubmission")(app);
    require("./postSubmissions")(app);
    require("./postApprovals")(app);
    require("./postRejected")(app);
};