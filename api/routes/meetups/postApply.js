const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostApply = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const data = {
            meetupUrlName: req.body.meetupUrlName,
            suggestedDateStart: new Date(req.body.suggestedDateStart).getTime(),
            suggestedDateEnd: new Date(req.body.suggestedDateEnd).getTime(),
            startDate: null,
            name: req.body.name,
            location: req.body.location,
            status: "APPLIED",
            userId
        };
        const result = await query.make(`INSERT INTO meetups SET ?`, [data]);
        const meetup = await query.once(`SELECT * FROM meetups WHERE id = ?`, [
            result.insertId
        ]);

        console.log(`Applied to meetup ${req.body.name}`);
        res.json(meetup);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/meetups/apply", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.MEETUPS.LIST)
        ],
        handlePostApply
    );
};