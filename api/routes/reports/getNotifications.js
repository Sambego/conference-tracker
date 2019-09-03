const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const helpers = require("../../utils/helpers");

const handleGetNotifications = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const conferencesSql = `SELECT DISTINCT c.id, c.name, "CONFERENCE" AS "type", r.id AS reportId, c.startDate
            FROM conferences c
            JOIN submissions s ON c.id = s.conferenceId
            JOIN users u ON u.id = s.userId
            LEFT JOIN reports r ON r.conferenceId = c.id
            WHERE s.status = "APPROVED"
                AND r.id IS NULL
                AND u.id = ?
                AND c.endDate < ?`;
        const meetupSql = `SELECT m.id, m.name, "MEETUP" AS "type", r.id AS reportId, m.startDate
            FROM meetups m
            JOIN users u ON u.id = m.userId
            LEFT JOIN reports r ON r.meetupId = m.id
            WHERE m.status = "CONFIRMED"
                AND r.id IS NULL
                AND u.id = ?
                AND m.startDate < ?`;

        const conferenceReportsToDo = query.make(conferencesSql, [
            userId,
            helpers.now()
        ]);
        const meetupReportsToDo = query.make(meetupSql, [userId, helpers.now()]);
        const reports = [
            ...(await conferenceReportsToDo),
            ...(await meetupReportsToDo)
        ];

        console.log(`Getting report notifications`);
        return res.json({ reports: reports.length });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/notifications", [permissions.authCheck],
        handleGetNotifications
    );
};