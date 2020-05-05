<template>
  <span class="text-left">
    <b-btn class="btn btn-success d-block w-100" v-b-modal.conferenceAddModal>+ Add</b-btn>

    <b-modal
      size="lg"
      id="conferenceAddModal"
      title="Add an event"
      @ok="handleOk"
      @show="onShown"
      ref="modal"
    >
      <b-form>
        <b-row>
          <b-col cols="6">
            <b-form-group v-bind:label="eventTypeName +' Name'" label-for="name">
              <b-form-input
                id="name"
                type="text"
                required
                v-bind:placeholder="eventTypeName + ' X'"
                v-model="conference.name"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Event Type" label-for="type">
              <b-form-select
                id="type"
                v-model="conference.eventType"
                :options="eventTypes"
                class="mb-3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group label="Start Date" label-for="startDate">
              <b-form-input
                id="startDate"
                type="date"
                required
                placeholder="MM-DD-YYYY"
                v-model="conference.startDate"
                @blur="startDateChanged"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="End Date" label-for="endDate">
              <b-form-input
                id="endDate"
                type="date"
                required
                placeholder="MM-DD-YYYY"
                v-model="conference.endDate"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="showCfp">
          <b-col cols="6">
            <b-form-group label="CFP URL" label-for="cfpUrl">
              <b-form-input
                id="cfpUrl"
                type="text"
                required
                placeholder="https://www.example.com"
                v-model="conference.cfpUrl"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="CFP Close Date" label-for="cfpDate">
              <b-form-input
                id="cfpDate"
                type="date"
                required
                placeholder="MM-DD-YYYY"
                v-model="conference.cfpDate"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="showLocation">
          <b-col cols="6">
            <b-form-group label="City" label-for="city">
              <b-form-input
                id="city"
                type="text"
                required
                placeholder="City"
                v-model="conference.city"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="State/Province" label-for="state">
              <b-form-input
                id="state"
                type="text"
                required
                placeholder="State/Province"
                v-model="conference.state"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="showLocation">
          <b-col cols="6">
            <b-form-group label="Country" label-for="country">
              <b-form-input
                id="country"
                type="text"
                required
                placeholder="Country"
                v-model="conference.country"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Region" label-for="region">
              <b-form-select
                id="region"
                v-model="conference.regionId"
                :options="regions"
                class="mb-3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group label="Twitter" label-for="twitter">
              <b-form-input
                id="twitter"
                type="text"
                required
                placeholder="@twitter"
                v-model="conference.twitter"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="Website" label-for="url">
              <b-form-input
                id="url"
                type="text"
                required
                placeholder="https://www.example.com"
                v-model="conference.url"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        </b-row>
        <b-row v-if="showLocation">
          <b-col cols="6">
            <b-form-group label="✈️ Covered" label-for="travelCovered">
              <b-form-select
                id="travelCovered"
                v-model="conference.travelCovered"
                :options="expensesOptions"
                class="mb-3"
              />
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group label="🏨 Covered" label-for="lodgingCovered">
              <b-form-select
                id="lodgingCovered"
                v-model="conference.lodgingCovered"
                :options="expensesOptions"
                class="mb-3"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6">
            <b-form-group label="Event personas" label-for="personas">
              <b-form-select
                id="personas"
                v-model="conference.personas"
                :options="personas"
                value-field="id"
                text-field="persona"
                multiple
                class="mb-3"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </span>
</template>

<script>
import { addConference, getRegions, getPersonas, getEventTypes, addSubmissions } from "../utils/conf-api";
import { EXPENSES_COVERED } from "../utils/helpers";

const eventsThatHaveCfp = [1, 7];
const eventsThatAreLocationBound = [1, 2, 7, 8, 9];
const eventsThatHaveSubmissions = [1, 2, 3, 4, 5, 7, 9, 14];

export default {
  name: "conference-add-modal",
  data() {
    return {
      conference: {
        name: "",
        url: "",
        startDate: "",
        endDate: "",
        cfpUrl: "",
        cfpDate: "",
        city: "",
        state: "",
        country: "",
        twitter: "",
        regionId: 1,
        personas: [],
        eventType: 1
      },
      regions: [],
      eventTypes: [],
      expensesOptions: [
        { value: EXPENSES_COVERED.NO, text: "No" },
        { value: EXPENSES_COVERED.YES, text: "Yes" },
        { value: EXPENSES_COVERED.TBD, text: "TBD / Not sure" }
      ],
      personas: []
    };
  },
  mounted() {
    getRegions().then((regions) => {
      regions.map(r => this.regions.push({ value: r.id, text: r.region }));
    });
    getEventTypes().then(types => types.forEach(type => this.eventTypes.push({ value: type.id, text: type.type })));
    this.getPersonas();
  },
  methods: {
    startDateChanged(event) {
      if (!this.conference.endDate) {
        this.conference.endDate = event.target.value;
      }
    },
    handleOk() {
      if (eventsThatHaveSubmissions.includes(this.conference.eventType)) {
        addConference({
          ...this.conference,
          startDate: new Date(this.conference.startDate).getTime(),
          endDate: new Date(this.conference.endDate).getTime(),
          cfpDate: new Date(this.conference.cfpDate).getTime(),
          personas: this.conference.personas.reduce((personas, persona) => (personas += `${persona},`), "")
        }).then(() => {
          this.$emit("conferenceAdded", {});
        });
      } else {
        addConference({
          ...this.conference,
          startDate: new Date(this.conference.startDate).getTime(),
          endDate: new Date(this.conference.endDate).getTime(),
          cfpDate: null,
          personas: this.conference.personas.reduce((personas, persona) => (personas += `${persona},`), "")
        }).then((event) => {
          addSubmissions({
            id: event.id,
            submissions: [{ talkId: null }],
            eventType: event.eventType
          }).then(() => {
            this.$emit("conferenceAdded", {});
          });
        });
      }
    },
    onShown() {
      this.conference.name = "";
      this.conference.url = "";
      this.conference.startDate = "";
      this.conference.endDate = "";
      this.conference.cfpUrl = "";
      this.conference.cfpDate = "";
      this.conference.city = "";
      this.conference.state = "";
      this.conference.country = "";
      this.conference.twitter = "";
    },
    handleSubmit() {
      // this.$refs.modal.hide();
    },
    getPersonas() {
      getPersonas().then((personas) => {
        this.personas = personas;
      });
    }
  },
  computed: {
    showCfp() {
      return eventsThatHaveCfp.includes(this.conference.eventType);
    },
    showLocation() {
      return eventsThatAreLocationBound.includes(this.conference.eventType);
    },
    eventTypeName() {
      if (this.eventTypes.length < 1) {
        return "";
      }

      return this.eventTypes.find(e => e.value === this.conference.eventType).text;
    }
  }
};
</script>

<style scoped>
</style>
