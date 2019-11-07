const request = require("request-promise");

const STATUS = require("../../vendor/status");
const { makeOption } = require("../../vendor/helper");
const S3 = require("../../vendor/bucket");

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

async function acceptNcloudNotification(req) {
  const { jobId, status } = req.body;
  console.log(req.body);
  if (!isSuccess(status)) return;

  const now = Date.now().toString();

  const option = getVODTranscoderAPIOption({
    timestamp: now,
    method: "GET",
    path: jobId
  });

  const _option = {
    url: `https://${process.env.VOD_TRANSACTION_HOST}${option.path}`,
    headers: option.headers
  };

  const output = await getJobOutput(_option);
  return output;
}

module.exports = { acceptNcloudNotification };
