const { S3Client } = require('@aws-sdk/client-s3');

const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
dotenv.config()

console.log("upoad", process.env.AWS_ACCESS_KEY_ID)

let s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket:'travelbuddyfinder',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        console.log("Hero");
        cb(null, Date.now().toString()+path.parse(file.originalname).name+ path.extname(file.originalname))
      }
    })
  })
module.exports = upload
