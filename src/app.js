require("dotenv").config();
const express = require("express");
const path = require("path");
const request = require("request-promise");

const STATUS = require("./vendor/status");
const { makeOption } = require("./vendor/helper");

const app = express();
const PORT = process.env.PORT || 4040;

app.use("/manifest/dest", express.static("public/videos"));
app.use("/js", express.static("public/js"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/test", async (req, res) => {
  const { jobId, status } = req.body;
  console.log(req.body);
  if (status !== STATUS.success) {
    return;
  }

  const now = Date.now().toString();

  const option = makeOption({
    host: process.env.VOD_TRANSACTION_HOST,
    method: "GET",
    path: `/api/v2/jobs/${jobId}`,
    timestamp: now,
    apiKey: process.env.API_KEY_PRI,
    accessKey: process.env.ACCESS_KEY_ID,
    secretKey: process.env.SECRET_KEY
  });

  const _option = {
    url: `https://${process.env.VOD_TRANSACTION_HOST}${option.path}`,
    headers: option.headers
  };
  console.log(_option);

  const result = await request(_option);
  const jobs = JSON.parse(result).jobs;
  const output = jobs[0].output;
  console.log("output", output);

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
