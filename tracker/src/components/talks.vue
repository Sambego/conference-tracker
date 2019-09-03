<template>
  <div class="talks">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <h2 class="mb-3">All talks</h2>

      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header>All available talks</b-card-header>
            <table class="table table-striped table-borderless mb-0">
              <thead>
                <tr>
                  <th scope="col">Talk Title</th>
                  <th scope="col">Author</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="talk in talks" :key="talk.id">
                  <td>
                    <router-link :to="'talk/' + talk.id">{{ talk.title }}</router-link>
                  </td>
                  <td>{{talk.name}}</td>
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
import TalkAddModal from "./talk-add-modal";
import { getTalks } from "../utils/conf-api";

export default {
  name: "talks",
  components: { AppNav, TalkAddModal },
  data() {
    return {
      talks: []
    };
  },
  mounted() {
    this.getTalks();
  },
  methods: {
    getTalks() {
      getTalks().then((talks) => {
        this.talks = talks;
      });
    }
  }
};
</script>

<style scoped>
</style>
