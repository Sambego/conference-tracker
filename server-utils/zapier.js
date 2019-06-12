const axios = require("axios");
const Pageres = require("pageres");
const cloudinary = require("cloudinary");

let creds;

if (process.env.NODE_ENV === "prod") {
  creds = process.env;
} else {
  creds = require("../credentials");
}

const URL = {
  addConferenceToSheet: "https://hooks.zapier.com/hooks/catch/5126522/vx7pmm/",
  createSLK: "https://hooks.zapier.com/hooks/catch/5126522/vxvv1v/",
  sendSlackMessage: "https://hooks.zapier.com/hooks/catch/5126522/vnx423/",
  addToEvangelistCalendar:
    "https://hooks.zapier.com/hooks/catch/5126522/vnp60u/",
  addToTrello: "https://hooks.zapier.com/hooks/catch/5126522/vxj0p1/",
  addMeetupToTrello: "https://hooks.zapier.com/hooks/catch/5126522/vxvwmh/",
  addToCommunityForums: "https://hooks.zapier.com/hooks/catch/5126522/vney7v/",
  addToMarketingRoadmap: "https://hooks.zapier.com/hooks/catch/5126522/vnefwg/",
  addToDevelopersReached: "https://hooks.zapier.com/hooks/catch/5126522/vncu8q/"
};

function buildUrl(url, params) {
  let queryParams = "";
  for (let key in params) {
    queryParams += `${key}=${params[key]}&`;
  }
  return `${url}?${queryParams}`;
}

function encodeData(data) {
  for (let key in data) {
    data[key] = encodeURIComponent(data[key]);
  }
  return data;
}

Zapier = {
  meetupApproved: data => {
    console.log("Zapierizing, meetup confirmed");

    data.topic = "Meetup";
    data.conference = "Meetup " + data.conference;
    data = encodeData(data);
    let promiseArray = [
      Zapier.sendSlackMessage(data),
      Zapier.addConferenceToSheet(data),
      Zapier.addMeetupToTrello(data),
      Zapier.addToCommunityForums(data),
      Zapier.addToMarketingRoadmap(data)
    ];
    Promise.all(promiseArray).then(data => {
      console.log("Done with Zapier");
    });
  },
  approved: data => {
    console.log("Zapierizing, accepted at conference");

    data.topic = "Conference";
    data = encodeData(data);
    let promiseArray = [
      Zapier.addConferenceToSheet(data),
      Zapier.createSLK(data),
      Zapier.sendSlackMessage(data),
      Zapier.addToTrello(data),
      Zapier.addToCommunityForums(data),
      Zapier.addToMarketingRoadmap(data)
    ];

    Promise.all(promiseArray).then(data => {
      console.log("Done with Zapier");
    });
  },
  report: data => {
    console.log("Zapierizing, new report");
    let promiseArray = [Zapier.addToDevelopersReached(data)];

    Promise.all(promiseArray).then(data => {
      console.log("Done with Zapier");
    });
  },
  addConferenceToSheet: data => {
    let url = buildUrl(URL.addConferenceToSheet, data);
    return axios.get(url).catch(err => {
      console.log("Error adding to sheet", err);
    });
  },
  createSLK: data => {
    // Get Screenshot
    let pageres = new Pageres({ delay: 0 })
      .src(data.website, ["iphone 5s"], { crop: true })
      .dest(__dirname + "/tmp")
      .run();
    return pageres
      .then(data => {
        console.log("We got a screenshot");
        //Upload to cloudinary
        cloudinary.config({
          cloud_name: creds.CLOUDINARY_CLOUD_NAME,
          api_key: creds.CLOUDINARY_API_KEY,
          api_secret: creds.CLOUDINARY_API_SECRET
        });

        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(
            __dirname + "/tmp/" + data[0].filename,
            function(err, result) {
              if (err) return reject(err);
              resolve(result);
            }
          );
        });
      })
      .then(result => {
        console.log("Sent to Cloudinary");
        // Add image URL
        data.image = result.secure_url;
      })
      .then(() => {
        let url = buildUrl(URL.createSLK, data);
        console.log("Sending to Zapier", url);
        return axios.get(url);
      })
      .catch(err => {
        console.log("Error creating SLK", err);
      });
  },
  sendSlackMessage: data => {
    let url = buildUrl(URL.sendSlackMessage, data);
    return axios.get(url).catch(err => {
      console.log("Error sending message on Slack", err);
    });
  },
  addToEvangelistCalendar: data => {
    let url = buildUrl(URL.addToEvangelistCalendar, data);
    return axios.get(url).catch(err => {
      console.log("Error adding to calendar", err);
    });
  },
  addToTrello: data => {
    let url = buildUrl(URL.addToTrello, data);
    return axios.get(url).catch(err => {
      console.log("Error adding to Trello", err);
    });
  },
  addMeetupToTrello: data => {
    let url = buildUrl(URL.addMeetupToTrello, data);
    return axios.get(url).catch(err => {
      console.log("Error adding meetup to Trello", err);
    });
  },
  addToCommunityForums: data => {
    let url = buildUrl(URL.addToCommunityForums, data);
    return axios.get(url).catch(err => {
      console.log("Error adding to Discourse", err);
    });
  },
  addToMarketingRoadmap: data => {
    data.topic = "Conference";
    let url = buildUrl(URL.addToMarketingRoadmap, data);
    return axios.get(url).catch(err => {
      console.log("Error adding to marketing roadmap", err);
    });
  },
  addToDevelopersReached: data => {
    let url = buildUrl(URL.addToDevelopersReached, data);
    return axios.get(url).catch(err => {
      console.log("Error adding to Developers Reached sheet", err);
    });
  }
};

module.exports = Zapier;
