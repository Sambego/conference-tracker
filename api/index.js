const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const events = require("./utils/events");
const helpers = require("./utils/helpers");
const permissions = require("./utils/permissions");
const query = require("./utils/query");

const now = helpers.now;
const PORT = process.env.PORT || 3333;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("dist"));

app.get("/api/public", (req, res) => {
    res.json({ value: "Hello" });
});

require("./routes/conferences/")(app);
require("./routes/meetups")(app);
require("./routes/submissions/")(app);
require("./routes/upcoming/")(app);
require("./routes/users")(app);
require("./routes/talks/")(app);
require("./routes/reports")(app);
require("./routes/stats")(app);
require("./routes/other")(app);

app.get("*", (req, res) => {
    res.sendFile(__dirname + "../dist/index.html");
});

app.listen(PORT, () => {
    console.log("Server ready, listening on port " + PORT);
});