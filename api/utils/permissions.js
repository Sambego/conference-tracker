const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const expressPermissions = require("express-jwt-permissions");
const auth0 = require("../utils/auth0");

const permissions = {
    CONFERENCE: {
        LIST: "conference:list",
        SUBMIT: "conference:submit",
        ADD: "conference:add",
        DETAILS: "conference:details",
        SUBMISSIONS: "conference:submissions",
        DELETE: "conference:delete"
    },
    MEETUPS: {
        LIST: "meetup:list",
        FIND: "meetup:find",
        DETAILS: "meetup:details"
    },
    UPCOMING: {
        LIST: "upcoming:list"
    },
    TALK: {
        LIST: "talks:list",
        ADD: "talks:add",
        UPDATE: "talks:update"
    },
    REPORTS: {
        DUE: "report:due",
        ADD: "report:add",
        READ: "report:read"
    },
    STATS: {
        READ: "stats:read"
    },
    PROFILE: {
        ALL: "profile:all"
    },
    SUBMISSIONS: {
        LIST: "submission:list",
        ADD: "submission:add",
        APPROVE: "submission:approve",
        REJECT: "submission:reject",
        DELETE: "submission:delete"
    }
};

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${auth0.credentials.DOMAIN}/.well-known/jwks.json`
    }),
    audience: auth0.credentials.AUDIENCE,
    issuer: `https://${auth0.credentials.DOMAIN}/`,
    algorithms: ["RS256"]
});

const guard = expressPermissions();

module.exports = {
    authCheck,
    guard,
    permissions
};