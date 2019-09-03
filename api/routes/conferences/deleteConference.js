const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleDeleteConference = async(req, res) => {
    const deleteConferenceSql = `DELETE FROM conferences WHERE id = ?`;
    const deleteSubmissionsSql = `DELETE FROM submissions WHERE conferenceId = ?`;
    const getAllSubmissionsForConferenceSql = `SELECT * FROM submissions WHERE conferenceId = ?`;

    try {
        const submissions = await query.make(getAllSubmissionsForConferenceSql, [
            req.params.id
        ]);

        if (submissions.length > 0) {
            await query.make(deleteSubmissionsSql, [req.params.id]);
            await query.make(deleteConferenceSql, [req.params.id]);
        } else {
            await query.make(deleteConferenceSql, [req.params.id]);
        }

        console.log(`The conference with ID ${req.params.id} has been deleted`);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.delete(
        "/api/conferences/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.CONFERENCES.DELETE_OWN) ||
            permissions.guard.check(permissions.permissions.CONFERENCES.DELETE_ANY)
        ],
        handleDeleteConference
    );
};