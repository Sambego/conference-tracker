const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetSubmissions = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const sql = `SELECT s.*, t.*, t.id _id
            FROM submissions s, talks t
            WHERE s.talkId = t.id AND conferenceId = ? AND s.userId = ?`;

        const result = await query.make(sql, [req.params.id, userId]);

        console.log(`Getting submissions for conference with ID ${req.params.id}`);
        return res.json(result);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/conferences/:id/submissions", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.LIST)
        ],
        handleGetSubmissions
    );
};