const AWS = require("aws-sdk");
const ENV = require("./env");

AWS.config.update({
  accessKeyId: ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  region: ENV.AWS_REGION,
});

const s3 = new AWS.S3();

module.exports = s3;

