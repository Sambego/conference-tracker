const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetMeetups = async(req, res) => {
    try {
        const meetup = await query.once(`SELECT * FROM meetups WHERE id = ?`, [
            req.params.id
        ]);
        const user = query.once(`SELECT * FROM users WHERE id = ?`, [
            meetup.userId
        ]);
        const talk = query.once(`SELECT * FROM talks WHERE id = ?`, [
            meetup.talkId
        ]);

        console.log(`Getting meetup with id ${req.params.id} details`);
        res.json({
            ...meetup,
            user: {...(await user) },
            talk: {...(await talk) }
        });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/meetups/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.MEETUPS.DETAILS)
        ],
        handleGetMeetups
    );
};