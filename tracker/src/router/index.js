import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/welcome";
import NeedInvite from "@/components/need-invite";
import Unauthorized from "@/components/unauthorized";
import Conferences from "@/components/conferences";
import ConferenceDetails from "@/components/conference-details";
import Upcoming from "@/components/upcoming";
import UserTalks from "@/components/user-talks";
import Talks from "@/components/talks";
import Callback from "@/components/callback";
import Submitted from "@/components/submitted";
import Approved from "@/components/approved";
import Talk from "@/components/talk";
import Meetups from "@/components/meetups";
import MeetupsFind from "@/components/meetups-find";
import MeetupsApplied from "@/components/meetups-applied";
import MeetupsAccepted from "@/components/meetups-accepted";
import MeetupDetails from "@/components/meetup-details";
import Profile from "@/components/profile";
import Reports from "@/components/reports";
import ReportsAll from "@/components/reports-all";
import ReportEdit from "@/components/report-edit";
import ReportRead from "@/components/report-read";
import Stats from "@/components/stats";
import Search from "@/components/search";

import { isLoggedIn } from "../utils/auth";
import { isGuest, isPermissionEnabled, PERMISSIONS } from "../utils/acl";

Vue.use(Router);

function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    return next({
      path: "/"
    });
  }

  if (isGuest()) {
    return next({
      path: "/needinvite"
    });
  }

  if (
    to.meta.requiredPermission &&
        !isPermissionEnabled(to.meta.requiredPermission)
  ) {
    return next({
      path: "/unauthorized"
    });
  }

  return next();
}

export default new Router({
  mode: "history",
  routes: [{
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/needinvite",
    name: "NeedInvite",
    component: NeedInvite
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized
  },
  {
    path: "/conferences",
    name: "Conferences",
    component: Conferences,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.CONFERENCES.LIST
    }
  },
  {
    path: "/conference/:conferenceId",
    name: "ConferenceDetails",
    component: ConferenceDetails,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.CONFERENCES.DETAILS
    }
  },
  {
    path: "/conferences/submitted/:conferenceId",
    name: "Submitted",
    component: Submitted,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.SUBMISSIONS.LIST
    }
  },
  {
    path: "/conferences/approved/:conferenceId",
    name: "Approved",
    component: Approved,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.SUBMISSIONS.APPROVE
    }
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: Upcoming,
    beforeEnter: requireAuth
  },
  {
    path: "/user/content",
    name: "UseContent",
    component: UserTalks,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.TALKS.LIST
    }
  },
  {
    path: "/content",
    name: "Content",
    component: Talks,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.TALKS.LIST
    }
  },
  {
    path: "/content/:talkId",
    name: "ContentDetails",
    component: Talk,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.TALKS.DETAILS
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.PROFILE.ALL
    }
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: Meetups,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.MEETUPS.LIST
    }
  },
  {
    path: "/meetups/find",
    name: "MeetupFind",
    component: MeetupsFind,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.MEETUPS.FIND
    }
  },
  {
    path: "/meetups/applied/:urlname",
    name: "MeetupsApplied",
    component: MeetupsApplied,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.MEETUPS.DETAILS
    }
  },
  {
    path: "/meetups/accepted/:meetupId",
    name: "MeetupsAccepted",
    component: MeetupsAccepted,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.SUBMISSIONS.APPROVE
    }
  },
  {
    path: "/meetups/:meetupId",
    name: "MeetupDetails",
    component: MeetupDetails,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.MEETUPS.DETAILS
    }
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.REPORTS.LIST_OWN
    }
  },
  {
    path: "/reports/all",
    name: "AllReports",
    component: ReportsAll,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.REPORTS.LIST_ANY
    }
  },
  {
    path: "/report/:type/:eventId?/edit",
    name: "ReportEdit",
    component: ReportEdit,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.REPORTS.ADD
    }
  },
  {
    path: "/report/:reportId/read",
    name: "ReportRead",
    component: ReportRead,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.REPORTS.DETAILS
    }
  },
  {
    path: "/stats",
    name: "Stats",
    component: Stats,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.STATS.READ
    }
  },
  {
    path: "/search/:query",
    name: "Search",
    component: Search,
    beforeEnter: requireAuth,
    meta: {
      requiredPermission: PERMISSIONS.CONFERENCES.LIST
    }
  },
  {
    path: "/callback",
    component: Callback
  }
  ]
});
