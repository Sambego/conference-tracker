const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");
const events = require("../../utils/events");

const handlePostApprovalsHook = async(conferenceId, approvedTalks, userId) => {
    try {
        const conference = await query.once(
            `SELECT c.id, c.name, c.startDate, c.endDate, c.city, c.state, c.country, c.url, c.twitter,
        c.relationshipGoal, c.attendeeGoal, c.overview, r.region, r.roadmapValue AS regionRoadmapValue
        FROM conferences c, regions r
        WHERE c.regionId = r.id AND c.id = ?`, [conferenceId]
        );
        const talk = await query.make(
            `SELECT t.id, t.title, t.abstract, t.notes
        FROM talks t, submissions s
        WHERE s.talkId = t.id AND t.id IN (?) AND s.conferenceId = ?`, [approvedTalks, conferenceId]
        );
        const speaker = await query.once(
            `SELECT u.name, u.picture, u.bio, u.communityUsername, u.email FROM users u WHERE u.id = ?`, [userId]
        );

        return events.acceptedAtConference(conference, talk.map(t => ({...t })), {
            ...speaker
        });
    } catch (error) {
        console.error(error);
    }
};

const handlePostApprovals = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);

        await query.once(
            `SELECT c.*, r.roadmapValue AS region
            FROM conferences c, regions r
            WHERE c.regionId = r.id
            AND c.id = ?`, [req.params.id]
        );

        await query.make(
            `UPDATE submissions SET status = "APPROVED"
            WHERE conferenceId = ?
            AND talkId IN (?)`, [req.params.id, req.body]
        );

        await query.make(
            `UPDATE submissions SET status = "REJECTED"
            WHERE conferenceId = ?
            AND userId = ?
            AND talkId NOT IN (?)`, [req.params.id, userId, req.body]
        );

        const conference = await query.once(
            `SELECT c.id, c.name, c.startDate, c.endDate, c.city, c.state, c.country, c.url, c.twitter,
            c.relationshipGoal, c.attendeeGoal, c.overview, r.region, r.roadmapValue AS regionRoadmapValue
            FROM conferences c, regions r
            WHERE c.regionId = r.id AND c.id = ?`, [req.params.id]
        );

        handlePostApprovalsHook(req.params.id, req.body, userId);
        console.log(`The conference with ID ${req.params.id} has approved talks`);
        res.json(conference);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post(
        "/api/submissions/conference/:id/approved", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.SUBMISSIONS.APPROVE)
        ],
        handlePostApprovals
    );
};