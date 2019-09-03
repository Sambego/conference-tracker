module.exports = app => {
    require("./getMeetups")(app);
    require("./getMeetup")(app);
    require("./putMeetup")(app);
    require("./postApply")(app);
    require("./postRejected")(app);
    require("./postDropped")(app);
};