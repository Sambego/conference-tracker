const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetSearchResults = async(req, res) => {
    try {
        const conferences = await query.make(
            `SELECT * FROM conferences WHERE INSTR(name, ?)`, [req.params.query]
        );

        console.log(`Getting search results for: ${req.params.query}`);
        res.json(conferences);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = (app) => {
    app.get(
        "/api/search/:query", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.CONFERENCES.LIST),
        ],
        handleGetSearchResults
    );
};