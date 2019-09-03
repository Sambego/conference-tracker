const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostDroppedMeetup = async(req, res) => {
    try {
        const sql = `UPDATE meetups SET status = "DROPPED" WHERE id = ?`;
        const result = await query.make(sql, [req.params.id]);

        console.log(`Meetup with id ${req.params.id} was dropped`);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/meetups/:id/dropped/", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.ADD)
        ],
        handlePostDroppedMeetup
    );
};