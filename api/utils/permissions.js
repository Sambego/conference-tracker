const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const expressPermissions = require("express-jwt-permissions");
const auth0 = require("../utils/auth0");

const permissions = {
    CONFERENCES: {
        LIST: "conferences:list",
        DETAILS: "conferences:details",
        ADD: "conferences:add",
        UPDATE: "conferences:update",
        DELETE_OWN: "conferences:delete:own",
        DELETE_ANY: "conferences:delete:any"
    },
    MEETUPS: {
        LIST: "meetups:list",
        DETAILS: "meetups:details",
        FIND: "meetups:find",
        UPDATE: "meetups:update",
        DELETE_OWN: "meetups:delete:own",
        DELETE_ANY: "meetups:delete:any"
    },
    UPCOMING: {
        LIST: "upcoming:list"
    },
    REPORTS: {
        LIST_OWN: "reports:list:own",
        LIST_ANY: "reports:list:any",
        DETAILS: "reports:details",
        ADD: "reports:add"
    },
    PROFILE: {
        ALL: "profile:all"
    },
    SUBMISSIONS: {
        LIST: "submissions:list",
        ADD: "submissions:add",
        APPROVE: "submissions:approve",
        REJECT: "submissions:reject",
        DELETE_OWN: "submissions:delete:own",
        DELETE_ANY: "submissions:delete:any"
    },
    TALKS: {
        LIST: "talks:list",
        DETAILS: "talks:details",
        ADD: "talks:add",
        UPDATE: "talks:update",
        DELETE_OWN: "talks:delete:own",
        DELETE_ANY: "talks:update:delete:any"
    },
    STATS: {
        READ: "stats:read"
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