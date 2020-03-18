const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const helpers = require("../../utils/helpers");

const handleGetReport = async(req, res) => {
    try {
        const sql = `SELECT DISTINCT reports.id, reports.conferenceId AS "eventId", users.name AS "userName", reports.impressions, reports.notes, reports.developersReached, reports.relations, reports.eventName, reports.eventDate, reports.link
        FROM reports
        JOIN users on users.id = reports.userId
        WHERE reports.id = ?`;

        const reports = await query.make(sql, [req.params.id]);

        console.log(`Getting report with id ${req.params.id}`);
        res.json(reports[0]);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/reports/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.REPORTS.DETAILS)
        ],
        handleGetReport
    );
};
