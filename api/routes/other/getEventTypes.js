const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetEventTypes = async(req, res) => {
    try {
        const types = await query.make(`SELECT * FROM eventTypes`, []);

        console.log(`Getting event types`);
        return res.json(types);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get("/api/event-types", [permissions.authCheck], handleGetEventTypes);
};