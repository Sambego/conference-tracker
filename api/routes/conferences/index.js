module.exports = app => {
    require("./getConferences")(app);
    require("./getConference")(app);
    require("./getSubmissions")(app);
    require("./getSLK")(app);
    require("./postConference")(app);
    require("./putConference")(app);
    require("./deleteConference")(app);
};