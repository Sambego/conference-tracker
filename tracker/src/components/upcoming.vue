<template>
  <div class="conferences">
    <app-nav></app-nav>

    <b-row>
      <b-col>&nbsp;</b-col>
    </b-row>

    <h2>Upcoming Events</h2>

    <b-row class="mb-4">
      <b-col>
        <b-card class="mt-3" header="Filters">
          <b-row>
            <b-col cols="4">
              <b-form-group id="filter-type" label="Type" label-for="filter-type-select">
                <b-form-select id="filter-type-select" v-model="type" :options="filters.type"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group id="filter-region" label="Region" label-for="filter-region-select">
                <b-form-select id="filter-region-select" v-model="region" :options="filters.region"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group
                id="filter-search"
                label="Search by name"
                label-for="filter-search-input"
              >
                <b-form-input
                  id="filter-search-input"
                  v-model="searchQuery"
                  placeholder="Enter a conference name"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Type</th>
              <th scope="col">Dates</th>
              <th scope="col">Location</th>
              <th scope="col">Speakers</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="conference in filteredEvents"
              :key="conference.type.substring(0,1) + conference._id"
            >
              <td>
                <router-link
                  v-if="conference.type=='CONFERENCE'"
                  :to="'conference/' + conference._id"
                >{{ conference.name }}</router-link>
                <router-link
                  v-if="conference.type=='MEETUP'"
                  :to="'meetup/' + conference._id"
                >{{ conference.name }}</router-link>
                <a :href="conference.url" target="_blank">🔗</a>
              </td>
              <td>
                <b-badge pill variant="success" v-if="conference.type=='CONFERENCE'">Conference</b-badge>
                <b-badge pill variant="danger" v-if="conference.type=='MEETUP'">Meetup</b-badge>
              </td>
              <td>
                {{ dateFormat(conference.startDate) }}
                <span
                  v-if="conference.endDate && conference.startDate != conference.endDate"
                >to {{ dateFormat(conference.endDate) }}</span>
              </td>
              <td>{{ conference.location }}</td>
              <td>{{ conference.speakers }}</td>
              <td>
                <ul class="list-inline">
                  <li class="list-inline-item" v-if="conference.type == 'CONFERENCE'">
                    <a :href="conference.slkLink" target="_blank">SLK</a>
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
import { getUpcomingConferences } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";

const getEventsByRegion = (events, region) =>
  events.filter(event => {
    if (!region) {
      return true;
    }

    return event.regionId === region;
  });
const getEventsByType = (events, type) =>
  events.filter(event => {
    if (!type) {
      return true;
    }

    return event.type === type;
  });
const getEventsByName = (events, searchQuery) =>
  events.filter(event => {
    if (!searchQuery) {
      return true;
    }

    return event.name.includes(searchQuery);
  });

export default {
  components: { AppNav },
  name: "upcoming",
  data() {
    return {
      conferences: [],
      now: new Date().getTime(),
      region: null,
      type: null,
      searchQuery: "",
      filters: {
        region: [
          { value: null, text: "All" },
          { value: 1, text: "Americas" },
          { value: 2, text: "EMEA" },
          { value: 3, text: "APAC" },
          { value: 4, text: "Global" }
        ],
        type: [
          { value: null, text: "All" },
          { value: "CONFERENCE", text: "Conference" },
          { value: "MEETUP", text: "Meetup" }
        ]
      }
    };
  },
  mounted() {
    this.getUpcoming();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getUpcoming() {
      getUpcomingConferences().then(conferences => {
        this.conferences = conferences;
      });
    }
  },
  computed: {
    filteredEvents() {
      return getEventsByRegion(
        getEventsByType(
          getEventsByName(this.conferences, this.searchQuery),
          this.type
        ),
        this.region
      );
    }
  }
};
</script>

<style scoped>
</style>
