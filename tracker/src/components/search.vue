<template>
  <div class="conferences">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <h2>Search results</h2>

      <b-row>
        <b-col>
          <b-card no-body>
            <table class="table table-borderless table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">Event Name</th>
                  <th scope="col">Dates</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="conference in searchResults" :key="conference._id">
                  <td>
                    <router-link :to="'/conference/' + conference.id">{{ conference.name }}</router-link>
                  </td>
                  <td>
                    {{ dateFormat(conference.startDate) }}
                    <span
                      v-if="conference.endDate != conference.startDate"
                    >to {{ dateFormat(conference.endDate) }}</span>
                  </td>
                  <td v-if="conference.city">
                    {{ conference.city }}
                    <span v-if="conference.state">({{ conference.state }})</span>
                    <span v-if="conference.country">- {{ conference.country }}</span>
                  </td>
                  <td v-if="!conference.city">N/A</td>
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

import { getSearchResults } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";

export default {
  components: { AppNav },
  name: "search",
  data() {
    return {
      searchResults: []
    };
  },
  mounted() {
    this.getSearchResults(decodeURIComponent(this.$route.params.query));
  },
  beforeRouteUpdate(newRoute, oldRoute, next) {
    if (
      newRoute.name === "Search" &&
      newRoute.params.query !== oldRoute.params.query
    ) {
      this.getSearchResults(decodeURIComponent(newRoute.params.query));
      next();
    }

    return next(false);
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getSearchResults(query) {
      getSearchResults(query).then(searchResults => {
        this.searchResults = searchResults;
      });
    }
  }
};
</script>
