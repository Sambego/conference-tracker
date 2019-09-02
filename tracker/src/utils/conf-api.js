import axios from "axios";
import { getAccessToken, getUserParam } from "./auth";

const BASE_URL = "https://conf-tracker.herokuapp.com";
// const BASE_URL = "http://localhost:3333";


function getHeaders() {
  const authToken = getAccessToken();
  return {
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined
    }
  };
}

function getConferences() {
  const url = `${BASE_URL}/api/conferences`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getUpcomingConferences() {
  const url = `${BASE_URL}/api/upcoming`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getConference(id) {
  const url = `${BASE_URL}/api/conference/${id}`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function addConference(data) {
  const url = `${BASE_URL}/api/conference`;
  return axios.post(url, data, getHeaders()).then(resp => resp.data);
}

function deleteConference(id) {
  const url = `${BASE_URL}/api/conference/${id}`;
  return axios.delete(url, getHeaders()).then((resp) => resp.data);
}

function updateConference(conferenceId, data) {
  const url = `${BASE_URL}/api/conference/${conferenceId}`;
  return axios.put(url, data, getHeaders()).then(resp => resp.data);
}

function getTalks() {
  const url = `${BASE_URL}/api/talks`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getMyTalks(userId) {
  const url = `${BASE_URL}/api/user/talks`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getTalkById(talkId) {
  const url = `${BASE_URL}/api/talks/${talkId}`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function updateTalk(talkId, data) {
  const url = `${BASE_URL}/api/talks/${talkId}`;
  return axios.put(url, data, getHeaders()).then(resp => resp.data);
}

function getMySubmissions(conferenceId) {
  const url = `${BASE_URL}/api/conference/${conferenceId}/submissions`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function deleteSubmission(submissionId) {
  const url = `${BASE_URL}/api/submission/${submissionId}`;
  return axios.delete(url, getHeaders()).then(resp => resp.data);
}

function addTalk(data) {
  const url = `${BASE_URL}/api/talk`;
  data.userId = getUserParam("sub");
  return axios.post(url, data, getHeaders()).then(resp => resp.data);
}

function addSubmissions(conferenceId, data) {
  const url = `${BASE_URL}/api/conference/${conferenceId}/submissions`;
  return axios.post(url, data, getHeaders()).then(resp => resp.data);
}

function addApprovals(conferenceId, approvals) {
  const url = `${BASE_URL}/api/conference/${conferenceId}/approvals`;
  return axios.post(url, approvals, getHeaders()).then(resp => resp.data);
}

function rejectConference(conferenceId) {
  const url = `${BASE_URL}/api/conference/${conferenceId}/rejected`;
  return axios.post(url, { conferenceId }, getHeaders()).then(resp => resp.data);
}

function saveLocalUser(data) {
  const url = `${BASE_URL}/api/user`;
  return axios.post(url, data, getHeaders()).then(resp => resp.data);
}

function getLocalUser() {
  const url = `${BASE_URL}/api/user`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getMeetups() {
  const url = `${BASE_URL}/api/meetups`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getMeetup(id) {
  const url = `${BASE_URL}/api/meetup/${id}`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function applyMeetup(meetup, start, end) {
  const data = {
    meetupUrlName: meetup.urlname,
    suggestedDateStart: start,
    suggestedDateEnd: end,
    name: meetup.name,
    location: meetup.localized_location
  };
  const url = `${BASE_URL}/api/meetup/applied`;
  return axios.post(url, data, getHeaders()).then(resp => resp.data);
}

function droppedMeetup(id) {
  const url = `${BASE_URL}/api/meetup/dropped/${id}`;
  return axios.post(url, {}, getHeaders()).then(resp => resp.data);
}

function rejectedMeetup(id) {
  const url = `${BASE_URL}/api/meetup/rejected/${id}`;
  return axios.post(url, {}, getHeaders()).then(resp => resp.data);
}

function confirmMeetup(id, data) {
  const url = `${BASE_URL}/api/meetup/approved/${id}`;
  return axios.put(url, data, getHeaders()).then(resp => resp.data);
}

function getAllReports() {
  const url = `${BASE_URL}/api/reports`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getReportsToDo() {
  const url = `${BASE_URL}/api/reports/todo`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getEventDetails(type, id) {
  if (type === "meetup") {
    return getMeetup(id);
  }

  return getConference(id);
}

function getReport(reportId) {
  const url = `${BASE_URL}/api/report/${reportId}`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function createReport(data) {
  const url = `${BASE_URL}/api/report`;
  return axios.post(url, data, getHeaders()).then(resp => resp.data);
}

function getRegions() {
  const url = `${BASE_URL}/api/regions`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getEventSources() {
  const url = `${BASE_URL}/api/event-sources`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getEventTypes() {
  const url = `${BASE_URL}/api/event-types`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getNotifications() {
  const url = `${BASE_URL}/api/notifications`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

function getStats() {
  const url = `${BASE_URL}/api/stats`;
  return axios.get(url, getHeaders()).then(resp => resp.data);
}

export {
  getConferences,
  getUpcomingConferences,
  getConference,
  addConference,
  deleteConference,
  updateConference,
  getTalks,
  getMyTalks,
  addTalk,
  getMySubmissions,
  addSubmissions,
  deleteSubmission,
  addApprovals,
  rejectConference,
  saveLocalUser,
  getLocalUser,
  getTalkById,
  updateTalk,
  getMeetups,
  getMeetup,
  applyMeetup,
  droppedMeetup,
  rejectedMeetup,
  confirmMeetup,
  getAllReports,
  getReportsToDo,
  getReport,
  getEventDetails,
  createReport,
  getRegions,
  getEventSources,
  getEventTypes,
  getNotifications,
  getStats
};
