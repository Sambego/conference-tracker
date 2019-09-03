const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostRejectedMeetup = async(req, res) => {
    try {
        const sql = `UPDATE meetups SET status = "REJECTED" WHERE id = ?`;
        const restult = await query.make(sql, [req.params.id]);

        console.log(`Meetup with id ${req.params.id} was rejected`);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/meetups/:id/rejected/", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.REJECT)
        ],
        handlePostRejectedMeetup
    );
};