<template>
  <div class="report">
    <app-nav></app-nav>

    <b-row>
      <b-col>&nbsp;</b-col>
    </b-row>

    <h2>
      Post-Event Report
      <span v-if="report.eventName">for {{ report.eventName }}</span>
    </h2>

    <b-row>
      <b-col cols="6" offset="3">
        <b-card v-bind:header="report.eventName">
          <table class="table table-striped">
            <thead class="thead-dark">
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

          <div v-if="report.impressions">
            <h2>Impressions</h2>
            <p>{{report.impressions}}</p>
          </div>
          <div v-if="report.notes">
            <h2>Notes</h2>
            <p>{{report.notes}}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
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
        getReport(this.$route.params.reportId).then((report) => {
          this.report = { ...report };
        });
      }
    }
  }
};
</script>

<style scoped>
</style>
