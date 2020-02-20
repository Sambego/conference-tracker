let permissions = [];

const PERMISSIONS = {
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
  },
  PERSONAS: {
    LIST: "personas:list",
    ADD: "personas:add",
    UPDATE: "personas:update"
  }
};

const setPermissions = (newPermissions) => {
  permissions = newPermissions;
  return permissions;
};

const isGuest = () => !permissions.length;
const isPermissionEnabled = permission => permissions.indexOf(permission) > -1;

// eslint-disable-next-line arrow-body-style
const getNavbarPermissions = () => {
  return {
    showConferenceLink: isPermissionEnabled(PERMISSIONS.CONFERENCES.LIST),
    showMeetupLink: isPermissionEnabled(PERMISSIONS.MEETUPS.LIST),
    showUpcomingLink: isPermissionEnabled(PERMISSIONS.UPCOMING.LIST),
    showOwnTalkLink: isPermissionEnabled(PERMISSIONS.TALKS.ADD),
    showTalkLink: isPermissionEnabled(PERMISSIONS.TALKS.LIST),
    showDueReportsLink: isPermissionEnabled(PERMISSIONS.REPORTS.LIST_OWN),
    showAllReportsLink: isPermissionEnabled(PERMISSIONS.REPORTS.LIST_ANY),
    showStatLink: isPermissionEnabled(PERMISSIONS.STATS.READ),
    showProfileLink: isPermissionEnabled(PERMISSIONS.PROFILE.ALL)
  };
};

const getConferenceListPermissions = () => ({
  addConference: isPermissionEnabled(PERMISSIONS.CONFERENCES.ADD),
  deleteOwnConference: isPermissionEnabled(PERMISSIONS.CONFERENCES.DELETE_OWN),
  deleteAnyConference: isPermissionEnabled(PERMISSIONS.CONFERENCES.DELETE_ANY)
});

const getMeetupListPermissions = () => ({
  findMeetup: isPermissionEnabled(PERMISSIONS.MEETUPS.FIND)
});

export { PERMISSIONS, isPermissionEnabled, setPermissions, isGuest, getNavbarPermissions, getConferenceListPermissions, getMeetupListPermissions };
