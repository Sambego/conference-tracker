const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostConference = async(req, res) => {
    try {
        const sql = `INSERT INTO conferences SET ?`;
        const result = query.make(sql, [req.body]);
        const conference = query.once(`SELECT * FROM conferences WHERE id = ?`, [
            result.insertId
        ]);

        console.log(`The conference with ID ${result.insertId} has been added`);
        res.json(conference);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/conferences", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.CONFERENCE.ADD)
        ],
        handlePostConference
    );
};