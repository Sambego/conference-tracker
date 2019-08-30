<template>
  <div class="conferences">
    <app-nav></app-nav>

    <b-row><b-col>&nbsp;</b-col></b-row>

    <h2>Welcome to the great list of conferences</h2>

    <b-row class="mb-4">
      <b-col>
        <b-card class="mt-3" header="Filters">
          <b-row>
            <b-col cols="4">
              <b-form-input
                class="float-right"
                id="filter"
                v-model="filterText"
                placeholder="Search"></b-form-input>
            </b-col>
            <b-col cols="2" class="text-left pt-2">
              <b-form-checkbox id="hide-expired" v-model="hideExpired" value="hide" unchecked-value="show">
                Hide Expired CFPs
              </b-form-checkbox>
            </b-col>
            <b-col cols="2" class="text-left pt-2">
              <b-form-checkbox id="hide-rejected" v-model="hideRejected" value="hide" unchecked-value="show">
                Hide Rejected
              </b-form-checkbox>
            </b-col>
            <b-col cols="4">
              <conference-add-modal @conferenceAdded="getConferences()"></conference-add-modal>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>


    <b-row><b-col>&nbsp;</b-col></b-row>

    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Conference Name</th>
              <th scope="col">Dates</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="conference in conferences" :key="conference._id"
                v-show="(hideRejected == 'show' || (hideRejected === 'hide' && !conference.rejected))
                        && (!filterText || (filterText.toLowerCase() && conference.name.toLowerCase().indexOf(filterText) > -1))
                        && (hideExpired == 'show' || (hideExpired === 'hide' && !conference.expired))">
              <td>
                <router-link :to="'conference/' + conference._id">{{ conference.name }}</router-link>
                <a :href="conference.url" target="_blank">🔗</a>
              </td>
              <td v-show="hideRejected">
                {{ dateFormat(conference.startDate) }}
                <span v-if="conference.endDate != conference.startDate">to {{ dateFormat(conference.endDate) }}</span>
              </td>
              <td>
                <span v-if="!conference.mySubmissions && !conference.myApproved && !conference.myRejected">N/A</span>
                <span v-if="conference.mySubmissions > 0">
                  Submitted
                  <router-link v-show="true" :to="'conferences/submitted/' + conference._id">
                    📝
                  </router-link>
                </span>
                <span v-if="conference.myApproved">Accepted</span>
                <span v-if="!conference.myApproved && conference.myRejected">Rejected</span>
              </td>
              <td>
                <ul class="list-inline" style="margin: 0;">
                  <li class="list-inline-item" v-if="conference.myApproved">
                    👍 (<a v-if="conference.slkLink" :href="conference.slkLink" target="_blank">SLK</a><span v-if="!conference.slkLink">pending</span>)
                  </li>
                  <li class="list-inline-item" v-if="conference.mySubmissions">
                    <router-link :to="'conferences/approved/' + conference._id">
                      <b-btn size="sm" variant="outline-success">Accepted</b-btn>
                    </router-link>
                    <b-btn size="sm" variant="outline-danger" @click="rejectConference(conference._id)">Rejected</b-btn>
                    <b-btn v-if="permissions.deleteOwnConference" size="sm" variant="danger" @click="openConferenceDeleteModal(conference.name, conference._id)">Delete</b-btn>
                  </li>
                  <li
                    class="list-inline-item"
                    v-if="!conference.mySubmissions && !conference.myApproved && !conference.myRejected && !conference.expired">
                      <b-btn size="sm" :to="'conferences/submitted/' + conference._id">
                      Submit
                    </b-btn>
                    <span v-show="conference.cfpUrl && conference.cfpEnd > now">
                      (<a :href="conference.cfpUrl">CFP</a>)
                    </span>
                    <b-btn v-if="!conference.mySubmissions && permissions.deleteAnyConference" size="sm" variant="danger" @click="openConferenceDeleteModal(conference.name, conference._id)">Delete</b-btn>
                  </li>
                  <li class="list-inline-item" v-if="!conference.myApproved && conference.expired">
                      Too late! CFP closed on {{ dateFormat(conference.cfpDate) }}<br/>
                      <router-link :to="'conferences/submitted/' + conference._id">
                        I just forgot to add it to conf-tracker (submit anyways)
                      </router-link>
                  </li>
                  <li v-if="conference.expired">
                    <b-btn v-if="!conference.mySubmissions && permissions.deleteAnyConference" size="sm" variant="danger" @click="openConferenceDeleteModal(conference.name, conference._id)">Delete</b-btn>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import ConferenceAddModal from "./conference-add-modal";
import { getConferences, rejectConference, deleteConference } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";
import { getConferenceListPermissions } from "../utils/acl";

export default {
  components: { AppNav, ConferenceAddModal },
  name: "conferences",
  data() {
    return {
      conferences: [],
      hideRejected: "hide",
      hideExpired: "hide",
      now: (new Date()).getTime(),
      filterText: "",
      permissions: getConferenceListPermissions()
    };
  },
  mounted() {
    this.getConferences();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getConferences() {
      getConferences().then((conferences) => {
        this.conferences = conferences;
      });
    },
    rejectConference(id) {
      rejectConference(id).then(this.getConferences);
    },
    openConferenceDeleteModal(name, id) {
      this.$bvModal.msgBoxConfirm(`Are you sure you want to delete "${name}"? This action can not be undone.`, {
        okVariant: "danger",
        okTitle: "Yes, delete the conference"
      })
        .then((confirm) => {
          if (confirm) {
            deleteConference(id);
            this.getConferences();
          }
        })
        .catch(console.error);
    }
  }
};
</script>

<style scoped>

</style>
