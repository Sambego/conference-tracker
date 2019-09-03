const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePutTalk = async(req, res) => {
    try {
        const data = req.body;
        delete data.id;
        const talkId = req.params.id;
        const putSql = `UPDATE talks SET ? WHERE id = ?`;
        const getSql = `SELECT * FROM talks WHERE id = ?`;

        talk = await query.make(putSql, [data, talkId]);
        const updatedTalk = await query.once(getSql, [talkId]);

        console.log(`Updating talk with id ${req.params.id}`);
        return res.json(updatedTalk);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.put(
        "/api/talks/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.TALK.UPDATE)
        ],
        handlePutTalk
    );
};