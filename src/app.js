require("dotenv").config();
const express = require("express");
const path = require("path");
const https = require("https");

const STATUS = require("./vendor/status");
const { makeOption } = require("./vendor/helper");

const app = express();
const PORT = process.env.PORT || 4040;

app.use("/manifest/dest", express.static("public/videos"));
app.use("/js", express.static("public/js"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/test", (req, res) => {
  const { jobId, status } = req.body;

  if (status !== STATUS.success) {
    return;
  }

  const vodTranscoder = { host: process.env.VOD_TRANSACTION_HOST };
  const now = Date.now().toString();

  const option = makeOption({
    host: vodTranscoder.host,
    method: "GET",
    path: `/api/v2/jobs/${jobId}`,
    timestamp: now,
    apiKey: process.env.API_KEY_PRI,
    accessKey: process.env.ACCESS_KEY_ID,
    secretKey: process.env.SECRET_KEY
  });

  const request = https.request(option, res => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", chunk => {
      console.log(`BODY: ${chunk}`);
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  request.on("error", e => {
    console.error(`problem with request: ${e.message}`);
  });

  request.write(body);

  request.end();
});

app.get("/", (req, res) => {
  console.log("test");
  // const html = fs.readFileSync(path.resolve(__dirname, "./view/index.html"));
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

app.get("/manifest", (req, res) => {
  console.log("manifest");

  res.sendFile(
    path.join(__dirname, "/public/manifest/sample-manifest-full.mpd")
  );
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...........`);
});
