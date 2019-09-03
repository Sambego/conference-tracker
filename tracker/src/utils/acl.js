let permissions = [];

const PERMISSIONS = {
    CONFERENCE: {
        LIST: "conference:list",
        SUBMIT: "conference:submit",
        ADD: "conference:add",
        DETAILS: "conference:details",
        SUBMISSIONS: "conference:submissions",
        DELETE: "conference:delete"
    },
    MEETUP: {
        LIST: "meetup:list",
        FIND: "meetup:find",
        DETAILS: "meetup:details"
    },
    UPCOMING: {
        LIST: "upcoming:list"
    },
    TALK: {
        LIST: "talks:list"
    },
    REPORT: {
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
    SUBMISSION: {
        LIST: "submission:list",
        ADD: "submission:add",
        APPROVE: "submission:approve",
        REJECT: "submission:reject",
        DELETE: "submission:delete"
    },
    ROLE: {
        AMBASSADOR: "role:ambassador",
        EVANGELIST: "role:evangelist",
        MANAGER: "role:manager",
        SALES: "role:sales",
        ADMIN: "role:admin"
    }
};

const setPermissions = (newPermissions) => {
    permissions = newPermissions;
    return permissions;
};

const isGuest = () => !permissions.length;
const isAdmin = () => permissions.includes(PERMISSIONS.ROLE.ADMIN);

const isPermissionEnabled = permission => permissions.indexOf(permission) > -1;

// eslint-disable-next-line arrow-body-style
const getNavbarPermissions = () => {
    return {
        showConferenceLink: isPermissionEnabled(PERMISSIONS.CONFERENCE.LIST),
        showMeetupLink: isPermissionEnabled(PERMISSIONS.MEETUP.LIST),
        showUpcomingLink: isPermissionEnabled(PERMISSIONS.UPCOMING.LIST),
        showTalkLink: isPermissionEnabled(PERMISSIONS.TALK.LIST),
        showReportLink: isPermissionEnabled(PERMISSIONS.REPORT.ADD) || isPermissionEnabled(PERMISSIONS.REPORT.DUE),
        showStatLink: isPermissionEnabled(PERMISSIONS.STATS.READ),
        showProfileLink: isPermissionEnabled(PERMISSIONS.PROFILE.ALL),
        showReportsLink: isPermissionEnabled(PERMISSIONS.REPORT.READ)
    };
};

const getConferenceListPermissions = () => ({
    deleteOwnConference: isPermissionEnabled(PERMISSIONS.CONFERENCE.DELETE),
    deleteAnyConference: isPermissionEnabled(PERMISSIONS.CONFERENCE.DELETE) && isAdmin()
});

export { PERMISSIONS, isPermissionEnabled, setPermissions, isGuest, isAdmin, getNavbarPermissions, getConferenceListPermissions };