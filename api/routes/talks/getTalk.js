const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetTalks = async(req, res) => {
    try {
        const sql = `SELECT * FROM talks WHERE id = ?`;
        const talk = await query.once(sql, [req.params.id]);

        console.log("Getting talk with id ${req.params.id}");
        return res.json(talk);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/talks/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.TALK.LIST)
        ],
        handleGetTalks
    );
};