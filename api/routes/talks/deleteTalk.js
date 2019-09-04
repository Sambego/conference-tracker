const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleDeleteTalk = async(req, res) => {
    try {
        const deleteSubmissionsSql = `DELETE FROM submissions WHERE talkid= ?`;
        const deleteTalkSql = `DELETE FROM talks WHERE id = ?`;
        await query.make(deleteSubmissionsSql, [req.params.id]);
        await query.make(deleteTalkSql, [req.params.id]);

        console.log(`Deleting talk with ID ${req.params.id}`);
        return res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.delete(
        "/api/talks/:id/", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.TALKS.DELETE_OWN) ||
            permissions.guard.check(permissions.permissions.TALKS.DELETE_ANY)
        ],
        handleDeleteTalk
    );
};