const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostTalks = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const sql = `INSERT INTO talks SET ?`;
        const talk = { title: req.body.title, userId };
        await query.make(sql, [talk]);

        console.log("Posting new talk");
        return res.json(talk);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/talks", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.TALK.ADD)
        ],
        handlePostTalks
    );
};