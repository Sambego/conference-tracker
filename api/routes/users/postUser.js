const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handlePostUser = async(req, res) => {
    try {
        const userId = await query.getDBUserId(req.headers);
        const userData = {
            id: userId,
            auth0Id: await query.getUserId(req.headers)
        };

        if (req.body.name) userData.name = req.body.name;
        if (req.body.picture) userData.picture = req.body.picture;
        if (req.body.bio) userData.bio = req.body.bio;
        if (req.body.email) userData.email = req.body.email;
        if (req.body.communityUsername)
            userData.communityUsername = req.body.communityUsername;

        const sql = !userId ?
            "INSERT INTO users SET ?" :
            `UPDATE users SET ? WHERE id = ${userId}`;

        await query.make(sql, [userData]);

        console.log("Saved user data");
        return res.json(userData);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.post("/api/user", [permissions.authCheck], handlePostUser);
};