const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetMeetups = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const sql = `SELECT m.*, m.id _id
            FROM meetups m, users u
            WHERE m.userId = u.id
                AND (
                m.status = "APPLIED" OR
                (m.status = "CONFIRMED" and m.startDate > ${helpers.now()})
                )
                AND m.status IN ("APPLIED", "CONFIRMED")
                AND u.id = ?
            ORDER BY m.startDate`;
        const meetups = await query.make(sql, [userId]);

        console.log(`Getting all meetups`);
        res.json(meetups);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/meetups", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.MEETUPS.LIST)
        ],
        handleGetMeetups
    );
};