<template>
  <div class="conference-details">
    <app-nav></app-nav>

    <b-row>
      <b-col>&nbsp;</b-col>
    </b-row>

    <h2>{{ meetup.name }}</h2>

    <b-row>
      <b-col></b-col>
    </b-row>

    <b-row>
      <b-col>This event will be held in {{ meetup.location }} on {{ dateFormat(meetup.startDate) }}.</b-col>
    </b-row>
    <b-row>
      <b-col>
        <br />
      </b-col>
    </b-row>
    <b-row>
      <b-col>{{ talk.title }} by {{ user.name }}</b-col>
    </b-row>
    <b-row>
      <b-col>
        <a :href="`https://www.meetup.com/${meetup.meetupUrlName}`">Meetup Page</a>
      </b-col>
    </b-row>
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
