const path = require("path");
const express = require("express");

const {
  acceptNcloudNotification
} = require("../vod-transcoder/vod-transcoder");

const indexRouter = express.Router();

indexRouter.post("/test", async (req, res) => {
  const output = await acceptNcloudNotification(req);

  if (!output) return;
  console.log(output);

  const bucketName = output.outputBucketName;
  const prefix = output.outputFiles[0].outputFileName.split("-")[0];
  console.log(bucketName);
  console.log(prefix);
});

indexRouter.get("/", (req, res) => {
  console.log("test");
  res.sendFile(path.join(__dirname, "/view/index.html"));
});

indexRouter.get("/manifest", (req, res) => {
  console.log("manifest");

  res.sendFile(
    path.join(__dirname, "/public/manifest/sample-manifest-full.mpd")
  );
});

module.exports = indexRouter;
