import React from 'react';
import Dropzone from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
import AWS from 'aws-sdk'


export default function UploadFile(props) {
    
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      })

    const handleOnDrop = (files, rejectedFiles) => {
        console.log(files)

        const zip = require('jszip')();
        
        for (let i = 0; i < files.length; i++) {
            zip.file(files[i].name, files[i]);
        }

        zip.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
            const filename = files[0].name
            
            const params = {
                Bucket: process.env.S3_BUCKET_FILES,
                Key: `${filename}.zip`,
                Body: blob
            }

            
            s3.upload(params, function(err, data) {
                console.log(err, data);
            });

        })
    
    }
  
    return (
        <div className={props.class}>
            <h2>{props.title}</h2>
            <Dropzone multiple={true} onDrop={handleOnDrop}>
            {({getRootProps, getInputProps}) => (
                <section className="Drop">
                    <div {...getRootProps()}>
                    <input {...getInputProps()} 
                    hidden
                    accept=".py"
                    multiple
                    type="file"
                    />
                    <InputInstructions/>
                    </div>
                </section>
            )}
            </Dropzone>
        </div>
  )
}
