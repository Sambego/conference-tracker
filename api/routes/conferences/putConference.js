const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePutConference = async(req, res) => {
    try {
        let data = req.body;
        delete data.id;
        delete data._id;
        delete data.submissions;

        const sql = `UPDATE conferences SET ? WHERE id = ?`;
        const result = await query.make(sql, [data, req.params.id]);
        const conference = await query.once(
            `SELECT * FROM conferences WHERE id = ?`, [req.params.id]
        );

        console.log(`The conference with id ${req.params.id} has been updated`);
        res.json(conference);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.put(
        "/api/conferences/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.CONFERENCE.ADD)
        ],
        handlePutConference
    );
};