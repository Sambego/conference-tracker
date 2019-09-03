const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const events = require("./api/utils/events");
const helpers = require("./api/utils/helpers");
const permissions = require("./api/utils/permissions");
const query = require("./api/utils/query");

const now = helpers.now;
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("dist"));

app.get("/api/public", (req, res) => {
    res.json({ value: "Hello" });
});

require("./api/routes/conferences")(app);
require("./api/routes/meetups")(app);
require("./api/routes/submissions")(app);
require("./api/routes/upcoming")(app);
require("./api/routes/users")(app);
require("./api/routes/talks")(app);
require("./api/routes/reports")(app);
require("./api/routes/stats")(app);
require("./api/routes/other")(app);

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => {
    console.log("Server ready, listening on port " + PORT);
});