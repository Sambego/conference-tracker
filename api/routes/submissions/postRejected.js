const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const events = require("../../utils/events");

const handlePostRejectedHook = async(conferenceId, userId, conference) => {
    try {
        const talks = await query.make(
            `SELECT * FROM talks WHERE id IN (SELECT talkId FROM submissions WHERE conferenceId = ? and userId = ?)`, [conferenceId, userId]
        );
        const user = await qwuery.once(`SELECT * FROM users WHERE id = ?`, [
            userId
        ]);

        return events.rejectedFromConference(conference, talks, user);
    } catch (error) {
        console.error(error);
    }
};

const handlePostRejected = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        await query.make(
            `UPDATE submissions SET status = "REJECTED" 
            WHERE conferenceId = ? AND userId = ?`, [req.params.id, userId]
        );
        const conference = query.once(`SELECT * FROM conferences WHERE id = ?`, [
            req.params.id
        ]);

        handlePostRejectedHook(req.params.id, userId, conference);
        console.log(`The conference with ID ${req.params.id} has rejected talks`);
        res.json(conference);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/submissions/conference/:id/rejected", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.REJECT)
        ],
        handlePostRejected
    );
};