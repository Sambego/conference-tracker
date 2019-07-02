<template>
  <div class="reports">
    <app-nav></app-nav>

    <b-row><b-col>&nbsp;</b-col></b-row>

    <h2>All Post-Event Reports</h2>


    <b-row><b-col>&nbsp;</b-col></b-row>

    <b-row>
      <b-col>
        <table class="table table-striped" v-if="reports.length > 0">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Conference Name</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="report in reports" :key="report.type.substring(0,1) + report.id">
              <td>
                {{ report.name }}
              </td>
              <td>
                <b-badge pill variant="success" v-if="report.type=='CONFERENCE'">Conference</b-badge>
                <b-badge pill variant="danger" v-if="report.type=='MEETUP'">Meetup</b-badge>
              </td>
              <td>
                {{ dateFormat(report.startDate) }}
              </td>
              <td>
                <router-link :to="`/report/${report.reportId}/read/`">
                  <b-btn variant="sm" class="btn-success">Read Report</b-btn>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row><b-col>&nbsp;</b-col></b-row>


  </div>
</template>

<script>
import AppNav from "./AppNav";
import { getAllReports } from "../utils/conf-api";
import { dateFormat } from "../utils/helpers";

export default {
  components: { AppNav },
  name: "reports",
  data() {
    return {
      reports: [],
      filterText: ""
    };
  },
  mounted() {
    this.getReports();
  },
  methods: {
    dateFormat(d) {
      return dateFormat(d);
    },
    getReports() {
      getAllReports().then((reports) => {
        this.reports = reports;
      });
    }
  }
};
</script>

<style scoped>

</style>
