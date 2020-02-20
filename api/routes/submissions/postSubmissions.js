const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostSubmissions = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const submittedTalks = await query.make(
            `SELECT talkId FROM submissions WHERE userId = ? AND conferenceId = ?`, [userId, req.params.id]
        );

        const inserts = [];
        const talks = submittedTalks.map(t => t.talkId);
        const submissions = req.body.submissions ? req.body.submissions : [];
        submissions.forEach(submission => {
            if (talks.indexOf(submission.talkId) === -1) {
                let data = {
                    talkId: submission.talkId,
                    userId: userId,
                    status: submission.talkId === null ? "APPROVED" : "NULL",
                    conferenceId: req.body.id,
                    eventType: req.body.eventType
                };

                inserts.push(query.make(`INSERT INTO submissions SET ?`, [data]));
            }
        });

        talks.forEach(talk => {
            if (!req.body.find(result => result.talkId === talk)) {
                inserts.push(
                    query.make(
                        `DELETE FROM submissions WHERE conferenceId = ? AND userId = ? and talkId = ?`, [req.params.id, userId, t]
                    )
                );
            }
        });

        await Promise.all(inserts);
        const conference = await query.once(
            `SELECT * FROM conferences WHERE id = ?`, [req.params.id]
        );

        console.log(`Updating submissions for conference with ID ${req.params.id}`);
        res.json(conference);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/submissions/conference/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.ADD)
        ],
        handlePostSubmissions
    );
};
