<template>
  <div class="report">
    <app-nav></app-nav>
    <div class="container-fluid pt-5">
      <h2 class="mb-3">
        Post-Event Report
        <span v-if="report.eventName">for {{ report.eventName }}</span>
      </h2>

      <b-row>
        <b-col cols="6" offset="3">
          <b-card v-bind:header="report.eventName" no-body>
            <b-card-header>Details</b-card-header>
            <table class="table table-striped table-borderless mb-0">
              <thead>
                <tr>
                  <th scope="col">Speaker</th>
                  <th scope="col">Developer reached</th>
                  <th scope="col">Relation made</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{report.userName}}</td>
                  <td>{{report.developersReached}}</td>
                  <td>{{report.relations}}</td>
                  <td>{{dateFormat(report.eventDate)}}</td>
                </tr>
              </tbody>
            </table>

            <b-card-header v-if="report.impressions">Impressions</b-card-header>
            <b-card-body v-if="report.impressions">
              <p class="mb-0">{{report.impressions}}</p>
            </b-card-body>
            <b-card-header v-if="report.notes">Notes</b-card-header>
            <b-card-body v-if="report.notes">
              <p class="mb-0">{{report.notes}}</p>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import { getReport } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";

export default {
  name: "report",
  components: { AppNav },
  data() {
    return {
      report: {}
    };
  },
  mounted() {
    this.getReport();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getReport() {
      if (this.$route.params.reportId) {
        getReport(this.$route.params.reportId).then(report => {
          this.report = { ...report };
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
