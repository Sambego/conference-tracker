const helpers = require("../../utils/helpers");
const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetConferences = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const sql = `SELECT conferences.*, conferences.id _id,
        (SELECT COUNT(id) FROM submissions WHERE status = "APPROVED" AND userId = ${userId} AND conferenceId = conferences.id) myApproved,
        (SELECT COUNT(id) FROM submissions WHERE status = "REJECTED" AND userId = ${userId} AND conferenceId = conferences.id) myRejected,
        (SELECT COUNT(id) FROM submissions WHERE status = "NULL" AND userId = ${userId}  AND conferenceId = conferences.id) mySubmissions
        FROM conferences
        WHERE startDate >= ${helpers.today()}`;
        console.log("----", helpers.today());
        const conferences = await query.make(sql);

        const mapConferences = (conferences) => {
            return conferences.map((conference) => {
                return {
                    ...conference,
                    expired: conference.mySubmissions === 0 &&
                        conference.cfpDate !== null &&
                        conference.cfpDate < helpers.yesterday(),
                    rejected: !!(!conference.myApproved && conference.myRejected),
                };
            });
        };

        const orderConferences = (conferences) => {
            return conferences.sort((a, b) => {
                if (a.startDate < b.startDate) return -1;
                return 1;
            });
        };

        console.log(`Getting all conferences`);
        return res.json(orderConferences(mapConferences(conferences)));
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = (app) => {
    app.get(
        "/api/conferences", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.CONFERENCES.LIST),
        ],
        handleGetConferences
    );
};