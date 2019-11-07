const S3 = require("../../vendor/bucket-api");

function test(output) {
  const bucketName = output.outputBucketName;
  const prefix = output.outputFiles[0].outputFileName.split("-")[0];
  console.log(bucketName);
  console.log(prefix);
}

module.exports = { test };
