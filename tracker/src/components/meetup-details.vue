<template>
  <div class="conference-details">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <b-row>
        <b-col md="4" offset="4">
          <b-card no-body>
            <h4 slot="header" class="mb-0">{{meetup.name}}</h4>
            <b-card-body border>
              <p>This event will be held in {{ meetup.location }} on {{ dateFormat(meetup.startDate) }}.</p>
            </b-card-body>

            <b-card-header>
              <h4 class="mb-0">Talk</h4>
            </b-card-header>

            <b-card-body>
              <p class="mb-0">{{ talk.title }} by {{ user.name }}</p>
            </b-card-body>

            <b-card-footer>
              <a :href="`https://www.meetup.com/${meetup.meetupUrlName}`">Meetup Page</a>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import { getMeetup } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";

export default {
  components: { AppNav },
  name: "meetupDetails",
  data() {
    return {
      meetup: {},
      talk: {},
      user: {}
    };
  },
  mounted() {
    this.getMeetup();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getMeetup() {
      getMeetup(this.$route.params.meetupId).then((meetup) => {
        this.meetup = meetup;
        this.talk = meetup.talk;
        this.user = meetup.user;
        console.log(this.talk, this.user);
      });
    }
  }
};
</script>

<style scoped>
</style>
