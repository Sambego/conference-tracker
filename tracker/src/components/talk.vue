<template>
  <div class="talk">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <h2 class="mb-3">
        {{ talk.title }}
        <span class="copyBtnNoFloat" v-clipboard:copy="talk.title">📋</span>
      </h2>

      <b-row class="mb-3" v-if="talk.userId === user.id">
        <b-col class="text-right">
          <b-btn class="btn btn-primary" @click="switchToEditMode" v-if="!editMode">Edit</b-btn>
          <b-btn class="btn btn-success" @click="saveChanges" v-if="editMode">Save</b-btn>
          <b-btn class="btn btn-danger" @click="cancelChanges" v-if="editMode">Cancel</b-btn>
        </b-col>
      </b-row>

      <div v-if="editMode" class="talkForm">
        <b-row>
          <b-col>
            <b-card no-body>
              <b-card-header>Edit your Talk</b-card-header>
              <b-card-body>
                <b-form>
                  <b-form-group id="title" label="Talk Title:" label-for="title">
                    <b-form-input id="title" type="text" v-model="talk.title" />
                  </b-form-group>
                  <b-form-group id="abstract" label="Abstract:" label-for="abstract">
                    <b-form-textarea id="abstract" v-model="talk.abstract" :rows="6"></b-form-textarea>
                  </b-form-group>
                  <b-form-group id="notes" label="Notes:" label-for="notes">
                    <b-form-textarea id="notes" v-model="talk.notes" :rows="6"></b-form-textarea>
                  </b-form-group>
                </b-form>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>

      <div v-if="!editMode" class="talkData">
        <b-card no-body>
          <b-card-header>
            Abstract
            <span class="copyBtn" v-clipboard:copy="talk.abstract">📋</span>
          </b-card-header>
          <b-list-group flush>
            <b-list-group-item>
              <p>{{ talk.abstract }}</p>
            </b-list-group-item>
          </b-list-group>
          <b-card-header>
            Notes
            <span class="copyBtn" v-clipboard:copy="talk.notes">📋</span>
          </b-card-header>
          <b-list-group flush>
            <b-list-group-item>
              <p>{{ talk.notes || "N/A" }}</p>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "bootstrap-vue/es/components/button/button";
import AppNav from "./AppNav";
import { getTalkById, updateTalk, getLocalUser } from "../utils/conf-api";

export default {
  components: {
    Button,
    AppNav
  },
  name: "Talk",
  data() {
    return {
      talk: {},
      user: {},
      editMode: false
    };
  },
  mounted() {
    this.getTalk();
    this.getUser();
  },
  methods: {
    saveChanges() {
      updateTalk(this.$route.params.talkId, this.talk).then(() => {
        this.editMode = false;
      });
    },
    cancelChanges() {
      this.getTalk();
      this.editMode = false;
    },
    switchToEditMode() {
      this.editMode = true;
    },
    getTalk() {
      getTalkById(this.$route.params.talkId).then((talk) => {
        this.talk = talk;
      });
    },
    getUser() {
      getLocalUser().then((user) => {
        this.user = user;
      });
    }
  }
};
</script>

<style scoped>
.label {
  font-weight: bold;
}

.talkForm,
.talkData {
  text-align: left;
}

.copyBtn {
  cursor: pointer;
  font-size: 16px;
  float: right;
  vertical-align: middle;
}

.copyBtnNoFloat {
  cursor: pointer;
  font-size: 16px;
  vertical-align: middle;
}
</style>
