import React from 'react';
import Dropzone from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
import Fetch from 'fetch';

export default function UploadFile(props) {
    
    let filekey = Math.floor(Math.random() * 1000000000);
    const filename = filekey.toString();
    let content = null

    const handleOnDrop = (files, rejectedFiles) => {

        const zip = require('jszip')();
        
        for (let i = 0; i < files.length; i++) {
            zip.file(files[i].name, files[i]);
        }

        zip.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file


        })

        fetch(`https://2ivhlotb6k.execute-api.us-east-1.amazonaws.com/dev/static-iam-store-simplified/${filename}.zip`, {
            method: 'PUT',
            headers:
        }).then((res) => {
            if (res.ok) {
                console.log("HTTP PUT SUCCESS")
            } else {
                console.log("HTTP PUT FAIL")
            }
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
