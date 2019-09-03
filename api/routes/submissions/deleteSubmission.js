const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleDeleteSubmission = async(req, res) => {
    try {
        const deleteSubmissionSql = `DELETE FROM submissions WHERE id = ?`;
        await query.make(deleteSubmissionSql, [req.params.id]);

        console.log(`Deleting submission with ID ${req.params.id}`);
        return res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.delete(
        "/api/submissions/:id/", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.DELETE)
        ],
        handleDeleteSubmission
    );
};