const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const helpers = require("../../utils/helpers");

const handleGetReportsTodo = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const confSQL = `SELECT DISTINCT c.id, c.name, "CONFERENCE" AS "type", r.id AS reportId, c.startDate
        FROM conferences c
        JOIN submissions s ON c.id = s.conferenceId
        JOIN users u ON u.id = s.userId
        LEFT JOIN reports r ON r.conferenceId = c.id
        WHERE s.status = "APPROVED"
            AND r.id IS NULL
            AND u.id = ?
            AND c.endDate < ?`;

        const meetupSQL = `SELECT m.id, m.name, "MEETUP" AS "type", r.id AS reportId, m.startDate
      FROM meetups m
      JOIN users u ON u.id = m.userId
      LEFT JOIN reports r ON r.meetupId = m.id
      WHERE m.status = "CONFIRMED"
        AND r.id IS NULL
        AND u.id = ?
        AND m.startDate < ?`;

        const conferences = query.make(confSQL, [userId, helpers.now()]);
        const meetups = query.make(meetupSQL, [userId, helpers.now()]);
        const reports = [...(await conferences), ...(await meetups)];

        console.log(`Getting all reports todo by user ${userId}`);
        res.json(reports);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/reports/todo", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.REPORTS.LIST_OWN)
        ],
        handleGetReportsTodo
    );
};