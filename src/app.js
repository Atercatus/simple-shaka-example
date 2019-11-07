require("dotenv").config();
const express = require("express");
const path = require("path");
const request = require("request-promise");

const STATUS = require("./vendor/status");
const { makeOption } = require("./vendor/helper");
const S3 = require("./vendor/bucket");

const app = express();
const PORT = process.env.PORT || 4040;

app.use("/manifest/dest", express.static("public/videos"));
app.use("/js", express.static("public/js"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function isSuccess(status) {
  return status === STATUS.success;
}

function getVODTranscoderAPIOption({ method, timestamp, path }) {
  return makeOption({
    host: process.env.VOD_TRANSACTION_HOST,
    method,
    path: `/api/v2/jobs/${path}`,
    timestamp,
    apiKey: process.env.API_KEY_PRI,
    accessKey: process.env.ACCESS_KEY_ID,
    secretKey: process.env.SECRET_KEY
  });
}

async function getJobOutput(option) {
  const result = await request(option);
  const jobs = JSON.parse(result).jobs;
  return jobs[0].output;
}

app.post("/test", async (req, res) => {
  const { jobId, status } = req.body;
  console.log(req.body);

  const now = Date.now().toString();

  if (!isSuccess(status)) return;

  const option = getVODTranscoderAPIOption({
    timestamp: now,
    method: "GET",
    path: jobId
  });

  // makeOption({
  //   host: process.env.VOD_TRANSACTION_HOST,
  //   method: "GET",
  //   path: `/api/v2/jobs/${jobId}`,
  //   timestamp: now,
  //   apiKey: process.env.API_KEY_PRI,
  //   accessKey: process.env.ACCESS_KEY_ID,
  //   secretKey: process.env.SECRET_KEY
  // });

  const _option = {
    url: `https://${process.env.VOD_TRANSACTION_HOST}${option.path}`,
    headers: option.headers
  };

  // const result = await request(_option);
  // const jobs = JSON.parse(result).jobs;
  // const output = jobs[0].output;
  // console.log("output", output);

  const output = getJobOutput(_option);
  console.log(output);

  const bucketName = process.env.BUCKET_NAME;
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
