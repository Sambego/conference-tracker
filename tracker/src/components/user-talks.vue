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
                  <td>
                    <b-btn
                      v-if="canDeleteOwnTalk"
                      size="sm"
                      variant="danger"
                      @click="openTalkDeleteModal(talk.title, talk._id)"
                    >Delete</b-btn>
                  </td>
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
import { getMyTalks, deleteTalk } from "../utils/conf-api";
import { isPermissionEnabled, PERMISSIONS } from "../utils/acl";

export default {
  name: "UserTalks",
  components: { AppNav, TalkAddModal },
  data() {
    return {
      talks: [],
      canDeleteOwnTalk: isPermissionEnabled(PERMISSIONS.TALKS.DELETE_OWN)
    };
  },
  mounted() {
    this.getMyTalks();
  },
  methods: {
    getMyTalks() {
      getMyTalks().then((talks) => {
        this.talks = talks;
      });
    },
    openTalkDeleteModal(name, id) {
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure you want to delete "${name}""? This action can not be undone.`,
          {
            okVariant: "danger",
            okTitle: "Yes, delete the talk"
          }
        )
        .then((confirm) => {
          if (confirm) {
            deleteTalk(id);
            this.getMyTalks();
          }
        })
        .catch(console.error);
    }
  }
};
</script>

<style scoped>
</style>
