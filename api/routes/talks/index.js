module.exports = app => {
    require("./getTalks")(app);
    require("./getTalk")(app);
    require("./postTalks")(app);
    require("./putTalk")(app);
};