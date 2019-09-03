const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const helpers = require("../../utils/helpers");

const handleGetReports = async(req, res) => {
    try {
        const confSQL = `SELECT DISTINCT c.id, c.name, "CONFERENCE" AS "type", r.id AS reportId, c.startDate
            FROM conferences c
            JOIN submissions s ON c.id = s.conferenceId
            LEFT JOIN reports r ON r.conferenceId = c.id
            WHERE s.status = "APPROVED"
            AND r.id IS NOT NULL
            AND c.endDate < ?`;

        const meetupSQL = `SELECT m.id, m.name, "MEETUP" AS "type", r.id AS reportId, m.startDate
            FROM meetups m
            LEFT JOIN reports r ON r.meetupId = m.id
            WHERE m.status = "CONFIRMED"
                AND r.id IS NOT NULL
                AND m.startDate < ?`;

        const conferences = query.make(confSQL, [helpers.now()]);
        const meetups = query.make(meetupSQL, [helpers.now()]);
        const reports = [...(await conferences), ...(await meetups)];
        const sortedReports = reports.sort((a, b) =>
            a.startDate > b.startDate ? -1 : 1
        );

        console.log(`Getting all reports`);
        res.json(sortedReports);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/reports", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.REPORTS.LIST_ANY)
        ],
        handleGetReports
    );
};