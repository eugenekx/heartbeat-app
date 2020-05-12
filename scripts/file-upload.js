const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const crypto = require('crypto');
const path = require('path');

var key_id = '';
var secret_key = '';

if (process.env.NODE_ENV === 'production') {
  key_id = process.env.aws_key_id;
  secret_key = process.env.aws_secret_key;
} else {
  const config = require('../config/keys');
  key_id = config.AWS_KEY_ID;
  secret_key = config.AWS_SECRET_ACCESS;
}

aws.config.update({
  accessKeyId: key_id,
  secretAccessKey: secret_key,
  region: 'eu-central-1'
});

const s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'heartbeat-review',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
      }
    })
  })
   
module.exports = upload;