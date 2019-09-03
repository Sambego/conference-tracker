const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetConferences = async(req, res) => {
    try {
        const sql = `SELECT *, id _id FROM talks WHERE userId = ?`;
        const talks = await query.make(sql, [req.params.id]);

        console.log(`Getting all talks for user with ID ${req.params.id}`);
        return res.json(talks);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/users/:id/talks", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.TALK.LIST)
        ],
        handleGetConferences
    );
};