<template>
  <div class="reports">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <h2>Post-Event Reports</h2>
      <h4>Yay! Metrics!</h4>

      <b-row>
        <b-col>&nbsp;</b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card no-body>
            <table class="table table-striped table-borderless mb-0" v-if="reports.length > 0">
              <thead>
                <tr>
                  <th scope="col">Conference Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="reportToDo in reports"
                  :key="reportToDo.type.substring(0,1) + reportToDo.id"
                >
                  <td>{{ reportToDo.name }}</td>
                  <td>
                    <b-badge pill variant="success" v-if="reportToDo.type=='CONFERENCE'">Conference</b-badge>
                    <b-badge pill variant="danger" v-if="reportToDo.type=='MEETUP'">Meetup</b-badge>
                  </td>
                  <td>{{ dateFormat(reportToDo.startDate) }}</td>
                  <td>
                    <router-link
                      :to="'report/' + reportToDo.type.toLowerCase() + '/' + reportToDo.id + '/edit'"
                    >
                      <b-btn variant="sm" class="btn-success">Fill Report</b-btn>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-card>
          <span v-if="reports.length == 0">
            <h3>No pending reports to fill</h3>
            <router-link :to="'/conferences'">
              <b-btn class="btn-success">+ Add Other Event</b-btn>
            </router-link>
          </span>
        </b-col>
      </b-row>

      <b-row>
        <b-col>&nbsp;</b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import AppNav from "./AppNav";
import { getReportsToDo } from "../utils/conf-api";
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
      getReportsToDo().then((reports) => {
        this.reports = reports;
      });
    }
  }
};
</script>

<style scoped>
</style>
