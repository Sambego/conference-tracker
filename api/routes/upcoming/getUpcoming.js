const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleUpcomgin = async(req, res) => {
    try {
        const users = [];
        const conferencesSql = `SELECT c.*, c.id _id, GROUP_CONCAT(DISTINCT u.name SEPARATOR ", ") speakers, s.status, "CONFERENCE" type
      FROM conferences c, users u, submissions s
      WHERE s.conferenceId = c.id
        AND s.userId = u.id
        AND s.status = "APPROVED"
        AND c.startDate > ${helpers.now()}
        ${
          req.params.week
            ? "AND c.startDate < " + (helpers.now() + 7 * 24 * 60 * 60 * 1000)
            : ""
        }
      GROUP BY c.name`;
        const meetupsSql = `SELECT m.*, m.id _id, u.name speakers, "MEETUP" type, CONCAT("https://www.meetup.com/", m.meetupUrlName) url
      FROM meetups m, users u
      WHERE m.userId = u.id AND m.status = "CONFIRMED" AND m.startDate > ${helpers.now()}
      ${
        req.params.week
          ? "AND m.startDate < " + (helpers.now() + 7 * 24 * 60 * 60 * 1000)
          : ""
      }`;
        const conferences = query.make(conferencesSql);
        const meetups = query.make(meetupsSql);
        const mapUpcomingEvents = events => {
            return events.map(event => {
                if (event.location) {
                    return event;
                }

                return {
                    ...event,
                    location: event.state ?
                        `${event.city}, ${event.state}, ${event.country}` :
                        `${event.city}, ${event.country}`
                };
            });
        };

        const sortUpcomintEvents = events => {
            return events.sort((a, b) => {
                if (a.startDate < b.startDate) return -1;
                return 1;
            });
        };

        console.log("Getting upcoming events");
        res.json(
            sortUpcomintEvents(
                mapUpcomingEvents([...(await conferences), ...(await meetups)])
            )
        );
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get("/api/upcoming/:week?", handleUpcomgin);
};