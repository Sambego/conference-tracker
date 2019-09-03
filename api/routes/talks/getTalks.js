const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetTalks = async(req, res) => {
    try {
        const sql = `SELECT ta.id, ta.title, ta.abstract, ta.notes, us.name FROM talks AS ta INNER JOIN users AS us ON ta.userId = us.id`;
        const talk = await query.make(sql);

        console.log("Getting all talks user data");
        return res.json(talk);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/talks", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.TALKS.LIST)
        ],
        handleGetTalks
    );
};