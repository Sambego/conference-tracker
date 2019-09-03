module.exports = app => {
    require("./getRegions")(app);
    require("./getEventSources")(app);
    require("./getEventTypes")(app);
};