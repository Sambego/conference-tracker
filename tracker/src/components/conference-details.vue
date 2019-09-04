<template>
  <div class="conference-details">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header>{{conference.name}}</b-card-header>
            <b-card-body>
              <p>
                This event will be held in {{ conference.city }} from {{ dateFormat(conference.startDate) }}
                to {{ dateFormat(conference.endDate) }}.
              </p>
            </b-card-body>
            <b-list-group flush>
              <b-list-group-item>✈️ {{ expensesCovered(conference.travelCovered) }}</b-list-group-item>
              <b-list-group-item>🏨 {{ expensesCovered(conference.lodgingCovered) }}</b-list-group-item>
            </b-list-group>
          </b-card>
        </b-col>
        <b-col>
          <b-card no-body>
            <b-card-header>Submissions</b-card-header>

            <table class="table table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">Talk</th>
                  <th scope="col">Presenter</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="submission in conference.submissions" :key="submission._id">
                  <td>{{ submission.talk.title }}</td>
                  <td>{{ submission.user.name }}</td>
                  <td>
                    <span v-if="submission.status === 'APPROVED'">👍</span>
                    <span v-if="submission.status === 'REJECTED'">👎</span>
                    <span v-if="submission.status === 'NULL'">❓</span>
                  </td>
                  <td>
                    <b-btn
                      v-if="canDeleteOwnSubMission && submission.user.id === user.id"
                      size="sm"
                      variant="danger"
                      @click="openSubmissionDeleteModal(submission.talk.title, submission._id)"
                    >Delete</b-btn>
                    <b-btn
                      v-if="canDeleteAnySubMission  && submission.user.id !== user.id"
                      size="sm"
                      variant="danger"
                      @click="openSubmissionDeleteModal(submission.talk.title, submission.id)"
                    >Delete</b-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import {
  getConference,
  getLocalUser,
  deleteSubmission
} from "../utils/conf-api";
import { dateFormat, expensesCovered } from "../utils/helpers";
import { isPermissionEnabled, PERMISSIONS } from "../utils/acl";

export default {
  components: { AppNav },
  name: "conferenceDetails",
  data() {
    return {
      conference: {},
      user: {},
      canSeeList: isPermissionEnabled(PERMISSIONS.SUBMISSIONS.LIST),
      canDeleteOwnSubMission: isPermissionEnabled(
        PERMISSIONS.SUBMISSIONS.DELETE_OWN
      ),
      canDeleteAnySubMission: isPermissionEnabled(
        PERMISSIONS.SUBMISSIONS.DELETE_ANY
      )
    };
  },
  mounted() {
    this.getConference();
    this.getUser();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    expensesCovered(val) {
      return expensesCovered(val);
    },
    getConference() {
      getConference(this.$route.params.conferenceId).then((conference) => {
        this.conference = conference;
      });
    },
    getUser() {
      getLocalUser().then((user) => {
        console.log(user);
        this.user = user;
      });
    },
    openSubmissionDeleteModal(name, id) {
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure you want to delete "${name}""? This action can not be undone.`,
          {
            okVariant: "danger",
            okTitle: "Yes, delete the submission"
          }
        )
        .then((confirm) => {
          if (confirm) {
            deleteSubmission(id).then(() => {
              this.getConference();
            });
          }
        })
        .catch(console.error);
    }
  }
};
</script>

<style scoped>
</style>
