const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetStats = async(req, res) => {
    try {
        const jan1st = new Date("2019-01-01").getTime();
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        const generalSql = `SELECT COUNT(id) totalEvents, SUM(developersReached) totalDevelopersReached,
      SUM(CASE WHEN regionId = 1 THEN developersReached ELSE 0 END) regionAmericas,
      SUM(CASE WHEN regionId = 2 THEN developersReached ELSE 0 END) regionEMEA,
      SUM(CASE WHEN regionId = 3 THEN developersReached ELSE 0 END) regionAPAC,
      SUM(CASE WHEN regionId = 4 THEN developersReached ELSE 0 END) regionGlobal,
      SUM(CASE WHEN sourceId = 1 THEN developersReached ELSE 0 END) sourceEvangelism,
      SUM(CASE WHEN sourceId = 2 THEN developersReached ELSE 0 END) sourceAmbExt,
      SUM(CASE WHEN sourceId = 3 THEN developersReached ELSE 0 END) sourceAmbInt,
      SUM(CASE WHEN typeId = 1 THEN developersReached ELSE 0 END) typeConference,
      SUM(CASE WHEN typeId = 2 THEN developersReached ELSE 0 END) typeMeetup,
      SUM(CASE WHEN typeId = 3 THEN developersReached ELSE 0 END) typeOnlineMeetup,
      SUM(CASE WHEN typeId = 4 THEN developersReached ELSE 0 END) typeOnlineCourse
    FROM reports
    WHERE eventDate > ?`;
        const reportsSql = `SELECT r.id, r.eventName, r.eventDate, r.developersReached, s.source, t.type, reg.region
      FROM reports r, eventSources s, eventTypes t, regions reg
      WHERE r.sourceId = s.id
        AND r.typeId = t.id
        AND r.regionId = reg.id
        AND eventDate > ?`;
        const general = await query.once(generalSql, [jan1st]);
        const reports = await query.make(reportsSql, [jan1st]);
        const monthly = months.map(m => {
            return {
                month: m,
                total: 0,
                americas: 0,
                emea: 0,
                apac: 0,
                global: 0,
                evangelism: 0,
                ambext: 0,
                ambint: 0,
                conference: 0,
                meetup: 0,
                onlinemeetup: 0,
                onlinecourse: 0
            };
        });

        reports.forEach(r => {
            const month = new Date(r.eventDate).getMonth();
            monthly[month].total += r.developersReached;

            switch (r.region) {
                case "Americas":
                    monthly[month].americas += r.developersReached;
                    break;
                case "EMEA":
                    monthly[month].emea += r.developersReached;
                    break;
                case "APAC":
                    monthly[month].apac += r.developersReached;
                    break;
                case "Global":
                    monthly[month].global += r.developersReached;
                    break;
            }

            switch (r.source) {
                case "Evangelism":
                    monthly[month].evangelism += r.developersReached;
                    break;
                case "Ambassador - External":
                    monthly[month].ambext += r.developersReached;
                    break;
                case "Ambassador - Internal":
                    monthly[month].ambint += r.developersReached;
                    break;
            }

            switch (r.type) {
                case "Conference":
                    monthly[month].conference += r.developersReached;
                    break;
                case "Meetup":
                    monthly[month].conference += r.developersReached;
                    break;
                case "Online Meetup":
                    monthly[month].conference += r.developersReached;
                    break;
                case "Online Course":
                    monthly[month].conference += r.developersReached;
                    break;
            }
        });

        console.log(`Getting stats`);
        return res.json({ general, reports, monthly });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/stats", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.STATS.READ)
        ],
        handleGetStats
    );
};