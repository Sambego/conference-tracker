const query = require("../../utils/query");

const handleGetSLK = async(req, res) => {
    try {
        const params = query.extractQueryParams(req.url);
        const conferenceId = params.conference_id;
        const slkLink = params.slk_link;
        const sql = `UPDATE conferences SET slkLink = ? WHERE id = ?`;

        console.log("SLK Link updated to " + slkLink, result);
        res.json(result);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get("/api/conferences/slk", handleGetSLK);
};