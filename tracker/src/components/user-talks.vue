<template>
  <div class="talks">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <h2>My talks</h2>

      <b-row class="mb-3">
        <b-col class="text-right">
          <talk-add-modal @talkAdded="getMyTalks()"></talk-add-modal>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header>All your talks</b-card-header>
            <table class="table table-striped table-borderless mb-0">
              <thead>
                <tr>
                  <th scope="col">Talk Title</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="talk in talks" :key="talk.id">
                  <td>
                    <router-link :to="'/talk/' + talk._id">{{ talk.title }}</router-link>
                  </td>
                  <td>N/A</td>
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
import { getMyTalks } from "../utils/conf-api";

export default {
  name: "UserTalks",
  components: { AppNav, TalkAddModal },
  data() {
    return {
      talks: []
    };
  },
  mounted() {
    this.getMyTalks();
  },
  methods: {
    getMyTalks() {
      getMyTalks().then(talks => {
        this.talks = talks;
      });
    }
  }
};
</script>

<style scoped>
</style>
