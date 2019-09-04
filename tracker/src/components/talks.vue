<template>
  <div class="talks">
    <app-nav></app-nav>

    <div class="container-fluid pt-5">
      <h2 class="mb-3">All talks</h2>

      <b-row class="mb-4">
        <b-col>
          <b-card class="mt-3" header="Filters">
            <b-row>
              <b-col cols="8">
                <b-form-input
                  class="float-right"
                  id="filter"
                  v-model="titleFilter"
                  placeholder="Search"
                ></b-form-input>
              </b-col>
              <b-col cols="4">
                <b-form-select v-model="authorFilter" :options="authors"></b-form-select>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>

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
                <tr v-for="talk in filteredTalks" :key="talk.id">
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

const getTalksByName = (talks, searchQuery) =>
  talks.filter((talk) => {
    if (!searchQuery) {
      return true;
    }

    return talk.title.includes(searchQuery);
  });

const getTalksByAuthor = (talks, author) =>
  talks.filter((talk) => {
    if (!author || author === "---- All Authors ----") {
      return true;
    }

    return talk.name.includes(author);
  });

export default {
  name: "talks",
  components: { AppNav, TalkAddModal },
  data() {
    return {
      talks: [],
      titleFilter: "",
      authorFilter: "---- All Authors ----",
      authors: ["---- All Authors ----"]
    };
  },
  mounted() {
    this.getTalks();
  },
  methods: {
    getTalks() {
      getTalks().then((talks) => {
        this.talks = talks;
        this.authors = [
          "---- All Authors ----",
          ...new Set(
            this.talks.map(talk => talk.name)
          )
        ].sort();
      });
    }
  },
  computed: {
    filteredTalks() {
      return getTalksByAuthor(
        getTalksByName(this.talks, this.titleFilter),
        this.authorFilter
      );
    }
  }
};
</script>

<style scoped>
</style>
