const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetConference = async(req, res) => {
    try {
        const conferenceSql = `SELECT *, id _id FROM conferences WHERE id = ?`;
        const submissionsSql = `SELECT s.*, t.title, u.name
      FROM submissions s, talks t, users u
      WHERE s.talkId = t.id AND s.userId = u.id AND s.conferenceId = ?`;

        const conference = await query.once(conferenceSql, [req.params.id]);
        const submissions = await query.make(submissionsSql, [req.params.id]);
        const augmentedConference = {
            ...conference,
            submissions: submissions.map(s => ({
                talk: { title: s.title },
                user: { name: s.name, id: s.userId },
                status: s.status,
                id: s.id
            }))
        };

        console.log(`Getting conference with ID ${req.params.id}`);
        res.json(augmentedConference);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/conferences/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.CONFERENCES.DETAILS)
        ],
        handleGetConference
    );
};