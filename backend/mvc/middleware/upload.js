const { S3Client } = require('@aws-sdk/client-s3');

const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')
dotenv.config()

// const storage = multer.diskStorage({
//     destination: function (req,File,cb){
//         //own logic on dest
//         //aws/s3
//         //req.body.ids
//         cb(null,"Uploads/");
//     },
//     filename:function(req,file,cb){
//         // let ext = path.extname(file.originalname)
//         cb(null,file.originalname);
//     },
// });

// const upload = multer({
//     storage:storage
// })

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
// app.post("/image",(req,res) =>{
    //     upload(req,res,(err) =>{
        //         if (err){
            //             console.log(err)
            //             res.status(400).send("something wrong")
            //         }
            //         res.send(req.file)
            //         console.log("file running")
            //     });
            //     //db call
            // });
            
            // app.listen(5555)
            
            // const express = require('express')
            // const app = express()
            // const multer = require('multer')
            
            // const upload = multer({dest:"Uploads/"}).single("demo_image")
            // app.get("/",(req,res) =>{
            //     res.send("hello")
            // })