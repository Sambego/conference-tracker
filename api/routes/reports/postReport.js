const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const events = require("../../utils/events");

const handlePostReport = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const data = {...req.body, userId };
        const result = await query.make(`INSERT INTO reports SET ?`, [data]);
        const sql = `SELECT r.*, t.type, s.source, reg.region
      FROM reports r, eventTypes t, eventSources s, regions reg
      WHERE r.regionId = reg.id
        AND r.typeId = t.id
        AND r.sourceId = s.id
        AND r.id = ?`;
        const report = await query.once(sql, [result.insertId]);

        console.log(`Posting report`);
        events.postConferenceReport(report);
        return res.json(report);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/reports", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.REPORTS.ADD)
        ],
        handlePostReport
    );
};