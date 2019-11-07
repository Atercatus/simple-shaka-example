const S3 = require("../../vendor/bucket-api");

async function test(output) {
  const bucketName = output.outputBucketName;
  const prefix = output.outputFiles[0].outputFileName.split("-")[0];
  console.log(bucketName);
  console.log(prefix);

  const params = {
    Bucket: bucketName,
    Prefix: prefix
  };

  const data = await S3.listObjectsV2(params).promise();
  console.log(data);
}

module.exports = { test };
