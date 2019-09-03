const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetRegions = async(req, res) => {
    try {
        const regions = await query.make(`SELECT * FROM regions`, []);

        console.log(`Getting regions`);
        return res.json(regions);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get("/api/regions", [permissions.authCheck], handleGetRegions);
};