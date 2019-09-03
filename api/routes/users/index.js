module.exports = app => {
    require("./getUser")(app);
    require("./getTalks")(app);
    require("./postUser")(app);
};