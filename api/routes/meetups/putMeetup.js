const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePutMeetup = async(req, res) => {
    try {
        let hookData = {};
        const userId = await query.getDBUserId(req.headers);
        const meetupIncomingData = {
            ...req.body,
            status: "CONFIRMED",
            startDate: new Date(req.body.startDate).getTime()
        };

        delete meetupIncomingData.userId;
        await query.make(`UPDATE meetups SET ? WHERE id = ?`, [
            meetupIncomingData,
            req.params.meetupId
        ]);

        const meetup = query.once(
            `SELECT m.*, u.name speaker, r.roadmapValue AS region, r.roadmapValue AS regionRoadmapValue, t.title
            FROM meetups m, users u, talks t, regions r
            WHERE m.talkId = t.id
                AND m.regionId = r.id
                AND t.userId = u.id
                AND m.id = ?`, [req.params.meetupId]
        );
        const speaker = await query.once(`SELECT * FROM users WHERE id = ?`, [
            userId
        ]);
        const talk = await query.once(`SELECT * FROM talks WHERE id = ?`, [
            hookData.meetup.talkId
        ]);

        events.acceptedAtMeetup(meetup, talk, speaker);

        console.log(`Updating meetup with id ${req.params.id}`);
        res.json(meetup);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.put(
        "/api/meetups/:id", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.MEETUPS.UPDATE)
        ],
        handlePutMeetup
    );
};