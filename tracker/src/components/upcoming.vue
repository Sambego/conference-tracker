<template>
  <div class="conferences">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <b-row>
        <b-col md="3">
          <b-row>
            <b-col>
              <b-card header="Filters">
                <b-row>
                  <b-col>
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
                <b-row>
                  <b-col>
                    <b-form-group id="filter-type" label="Type" label-for="filter-type-select">
                      <b-form-select id="filter-type-select" v-model="type" :options="[{ value: null, text: 'All' }, ...eventTypes.map(t => ({text: t.type, value: t.id}))]"></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group
                      id="filter-region"
                      label="Region"
                      label-for="filter-region-select"
                    >
                      <b-form-select
                        id="filter-region-select"
                        v-model="region"
                        :options="filters.region"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group
                      id="filter-persona"
                      label="Persona"
                      label-for="filter-persona-select"
                    >
                      <b-form-select
                        id="filter-persona-select"
                        v-model="persona"
                        :options="filters.personas"
                        value-field="id"
                        text-field="persona"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col>
                    <b-form-group
                      id="filter-speaker"
                      label="Speaker"
                      label-for="filter-speaker-select"
                    >
                      <b-form-select
                        id="filter-speaker-select"
                        v-model="speaker"
                        :options="filters.speakers"
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="9">
          <b-row>
            <b-col>
              <b-card header="Upcoming events" no-body>
                <table class="table table-striped table-borderless mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Event Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Dates</th>
                      <th scope="col">Location</th>
                      <th scope="col">Speakers</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="conference in filteredEvents"
                      :key="conference.type.substring(0,1) + conference._id"
                    >
                      <td>
                        <router-link
                          :to="'conference/' + conference._id"
                        >{{ conference.name }}</router-link>
                        <a :href="conference.url" target="_blank">🔗</a>
                      </td>
                      <td>
                        {{ getEventTypeName(conference.eventType) }}
                      </td>
                      <td>
                        {{ dateFormat(conference.startDate) }}
                        <span
                          v-if="conference.endDate && conference.startDate != conference.endDate"
                        >to {{ dateFormat(conference.endDate) }}</span>
                      </td>
                      <td>{{ conference.location }}</td>
                      <td>{{ conference.speakers }}</td>
                    </tr>
                  </tbody>
                </table>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import { getUpcomingConferences, getPersonas, getEventTypes } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";

const getEventsByRegion = (events, region) =>
  events.filter((event) => {
    if (!region) {
      return true;
    }

    return event.regionId === region;
  });
const getEventsByType = (events, type) =>
  events.filter((event) => {
    if (!type) {
      return true;
    }
    console.log(type, event);
    return event.eventType === type;
  });
const getEventsByPersona = (events, persona) =>
  events.filter((event) => {
    if (!persona) {
      return true;
    }

    if (!event.personas) {
      return false;
    }

    return event.personas.split(",").includes(`${persona}`);
  });
const getEventsBySpeaker = (events, speaker) =>
  events.filter((event) => {
    if (!speaker || speaker === "All") {
      return true;
    }

    return event.speakers.includes(speaker);
  });
const getEventsByName = (events, searchQuery) =>
  events.filter((event) => {
    if (!searchQuery) {
      return true;
    }

    return event.name.toLowerCase().includes(searchQuery.toLowerCase());
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
      persona: null,
      speaker: "All",
      filters: {
        region: [
          { value: null, text: "All" },
          { value: 1, text: "Americas" },
          { value: 2, text: "EMEA" },
          { value: 3, text: "APAC" },
          { value: 4, text: "Global" }
        ],
        personas: [],
        speakers: ["All"]
      },
      eventTypes: []
    };
  },
  mounted() {
    this.getUpcoming();
    this.getPersonas();
    this.getEventTypes();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getUpcoming() {
      getUpcomingConferences().then((conferences) => {
        this.conferences = conferences;
        this.filters.speakers = [
          "All",
          ...[
            ...new Set(
              conferences.map(conference => conference.speakers)
            )
          ].sort()
        ];
      });
    },
    getPersonas() {
      getPersonas().then((personas) => {
        this.filters.personas = [{ id: null, persona: "All" }, ...personas];
      });
    },
    getEventTypes() {
      getEventTypes().then(types => this.eventTypes = types);
    },
    getEventTypeName(type = 1) {
      const eventType = Number.isInteger(type) ? type : 1;
      if (this.eventTypes.length < 1) {
        return "";
      }

      return this.eventTypes.find(e => e.id === eventType).type;
    }
  },
  computed: {
    filteredEvents() {
      return getEventsBySpeaker(
        getEventsByRegion(
          getEventsByType(
            getEventsByPersona(
              getEventsByName(this.conferences, this.searchQuery),
              this.persona
            ),
            this.type
          ),
          this.region
        ),
        this.speaker
      );
    }
  }
};
</script>

<style scoped>
</style>
