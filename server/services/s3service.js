const AWS = require('aws-sdk');
require('dotenv').config();

console.log(process.env.IAM_USER_SECRET,"ckjdgyvgvgh")
const uploadToS3=(data, filename)=>{
    console.log(process.env.IAM_USER_KEY) 
    const BUCKET_NAME ='group-talk';

    //console.log(process.env.IAM_USER_KEY);
    let s3bucket = new AWS.S3({
        accessKeyId : "AKIA3ATJAGI6FR3NQE53",
        secretAccessKey: "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",
        region:'ap-south-1'
    })
    console.log(process.env.IAM_USER_SECRET)
    var params = {
        Bucket: BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }
    //console.log(s3bucket );
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log('Something went wrong',err)
                reject(err)
            }else{
                console.log('success', s3response);
                resolve(s3response.Location);
            }
        })
    })

}

module.exports={
    uploadToS3
}