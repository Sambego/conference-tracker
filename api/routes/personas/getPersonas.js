const permissions = require("../../utils/permissions");
const query = require("../../utils/query");

const handleGetPersonas = async(req, res) => {
    try {
        const sql = `SELECT * from personas`;
        const personas = await query.make(sql, []);

        console.log(`Getting personas`);
        res.json(personas);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

module.exports = app => {
    app.get(
        "/api/personas", [
            permissions.authCheck,
            permissions.guard.check(permissions.permissions.PERSONAS.LIST)
        ],
        handleGetPersonas
    );
};