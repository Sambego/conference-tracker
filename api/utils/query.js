const mysql = require("mysql");
const jwtDecode = require("jwt-decode");
const auth0 = require("../utils/auth0");
const CONNECTION_STRING = auth0.credentials.DB_CONN_STRING;
const connection = mysql.createConnection(CONNECTION_STRING);

const getUserId = headers => {
    if (!headers.Authorization && !headers.authorization) return null;
    const token = (headers.Authorization || headers.authorization).split(" ")[1];
    const decoded = jwtDecode(token);
    if (!decoded.sub) return null;

    return decoded.sub;
};

const getDBUserId = headers => {
    const userId = getUserId(headers);

    let p = new Promise((res, rej) => {
        const conditions = { auth0Id: userId };
        connection.query(
            "SELECT * FROM users WHERE ?",
            conditions,
            (err, result) => {
                if (err) return rej(err);
                if (result.length === 0) return res(null);
                return res(result[0].id);
            }
        );
    });
    return p;
};

const extractQueryParams = url => {
    const queryString = url.split("?")[1];
    const items = queryString.split("&");
    let params = {};
    for (let i = 0; i < items.length; i++) {
        let splittedItems = items[i].split("=");
        params[splittedItems[0]] = decodeURIComponent(splittedItems[1]);
    }
    return params;
};

const query = (sql, params) => {
    let p = new Promise((resolve, reject) => {
        if (params) {
            connection.query(sql, params, (err, result) => {
                if (err) return reject(err);

                return resolve(result);
            });
        } else {
            connection.query(sql, (err, result) => {
                if (err) return reject(err);

                return resolve(result);
            });
        }
    });
    return p;
};

const queryOne = (sql, params) => {
    return query(sql, params).then(data => data[0]);
};

module.exports = {
    getUserId,
    getDBUserId,
    extractQueryParams,
    make: query,
    once: queryOne
};