const AWS = require("aws-sdk");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const accessKey = process.env.ACCESS_KEY_ID;
const secretKey = process.env.SECRET_KEY;

AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey
});

const S3 = new AWS.S3({
  endpoint,
  region
});

module.exports = S3;
