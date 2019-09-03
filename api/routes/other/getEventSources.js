const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetEventSources = async(req, res) => {
    try {
        const sources = await query.make(`SELECT * FROM eventSources`, []);

        console.log(`Getting event sources`);
        return res.json(sources);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get("/api/event-sources", [permissions.authCheck], handleGetEventSources);
};