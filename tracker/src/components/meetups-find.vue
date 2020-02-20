<template>
  <div class="meetups">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <b-row class="mb-3">
        <b-col>
          <b-card no-body>
            <b-card-header>
              Find a meetup
              <span style="font-size: 12px;">Powered by MeetupFinder.com</span>
            </b-card-header>
            <b-card-body>
              <b-form inline>
                <b-col md="10">
                  <label class="sr-only" for="city">City</label>
                  <places v-model="city" placeholder="City" @change="changeLocation" />
                </b-col>
                <b-col md="2">
                  <b-button
                    variant="primary"
                    type="button"
                    :disabled="searching"
                    @click="findMeetups"
                  >Find Meetups</b-button>
                </b-col>
              </b-form>
              <b-form>
                <!--<b-input class="col-8" id="city" placeholder="City" v-model="city" />-->
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card no-body>
            <table class="table table-striped table-borderless mb-0">
              <thead>
                <tr>
                  <th>Meetup Name</th>
                  <th>Location</th>
                  <th># Members</th>
                  <th>Score</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="meetup in meetups" :key="meetup.id">
                  <td>
                    <a :href="meetup.link" target="_blank">{{ meetup.name }}</a>
                  </td>
                  <td>
                    <a :href="meetupUrl(meetup)" target="_blank">{{ meetup.location }}</a>
                  </td>
                  <td>{{ meetup.members }} {{ meetup.who }}</td>
                  <td>{{ Math.round(meetup.score/225*100) + " %" }}</td>
                  <td>
                    <ul class="list-inline">
                      <li class="list-inline-item">
                        <b-btn
                          :href="'https://www.meetup.com/' + meetup.urlname"
                          target="_blank"
                        >View</b-btn>
                        <b-btn
                          :href="'https://www.meetup.com/' + meetup.urlname + '/members/?op=leaders'"
                          target="_blank"
                        >Contact Organizers</b-btn>
                        <router-link :to="'/meetups/applied/' + meetup.urlname">
                          <b-btn variant="success">Applied</b-btn>
                        </router-link>
                      </li>
                    </ul>
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
import places from "vue-places";
import AppNav from "./AppNav";
import { getMeetups } from "../utils/meetupfinder-api";

export default {
  components: { AppNav, places },
  name: "meetups-find",
  data() {
    return {
      city: "",
      latlng: {},
      searching: false,
      meetups: []
    };
  },
  methods: {
    changeLocation(query) {
      this.latlng = query.latlng;
    },
    findMeetups() {
      this.searching = true;
      getMeetups(this.latlng).then((meetups) => {
        this.searching = false;
        this.meetups = meetups;
      });
    },
    meetupUrl(meetup) {
      return `https://www.google.com/maps/?q=${meetup.coords.lat},${meetup.coords.lon}`;
    }
  }
};
</script>

<style scoped>
</style>
