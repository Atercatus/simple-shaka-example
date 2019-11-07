const path = require("path");
const express = require("express");

const {
  acceptNcloudNotification
} = require("../vod-transcoder/vod-transcoder");

const indexRouter = express.Router();

indexRouter.post("/test", async (req, res) => {
  const output = await acceptNcloudNotification(req);
  console.log(output);

  const bucketName = process.env.BUCKET_NAME;
});

indexRouter.get("/", (req, res) => {
  console.log("test");
  // const html = fs.readFileSync(path.resolve(__dirname, "./view/index.html"));
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

indexRouter.get("/manifest", (req, res) => {
  console.log("manifest");

  res.sendFile(
    path.join(__dirname, "/public/manifest/sample-manifest-full.mpd")
  );
});

module.exports = indexRouter;
