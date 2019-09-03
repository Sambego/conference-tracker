const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetUser = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const user = await query.once(`SELECT * FROM users WHERE id = ?`, [userId]);

        console.log("Getting user data");
        res.json(user);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get("/api/user", [permissions.authCheck], handleGetUser);
};