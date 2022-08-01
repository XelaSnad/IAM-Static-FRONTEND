// import React from 'react';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
import Fetch from 'fetch';

export default function UploadFile(props) {
    let [policy, setPolicy] = useState('');
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/python': ['.py'],
        },
        onDrop: (e) => {
            handleOnDrop(e);
        },
    });
    let filekey = Math.floor(Math.random() * 1000000000);

    const handleOnDrop = (files) => {
        const zip = require('jszip')();
        for (let i = 0; i < files.length; i++) {
            zip.file(files[i].name, files[i]);
        }

        let uri =
            'https://fz41s9yjre.execute-api.ap-southeast-2.amazonaws.com/UAT/triggerscriptanalyzer';
        zip.generateAsync({ type: 'blob' }).then((blob) => {
            let requestOptions = {
                method: 'OPTIONS',
                'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Methods':
                // 'GET, PUT, PATCH, POST, DELETE, OPTIONS',
                // 'Access-Control-Allow-Headers': 'Authorization, Content-Type',
                redirect: 'follow',
            };
            fetch(uri, requestOptions)
                .then((e) => {
                    console.log(e);
                    return e.json();
                })
                .then((e) => {
                    console.log(e);
                    // setPolicy(e);
                })
                .catch((e) => {
                    console.log(e);
                });

            // 1) generate the zip file
            // console.log(blob);
            // fetch('google.com').then((e) => console.log(e));
            // fetch ()
        });
    };
    return (
        <div className={props.class}>
            <h1>{policy}</h1>
            <h2>{props.title}</h2>
            <section className="Drop">
                <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} hidden />
                        {/* <p>
                        Drag 'n' drop some files here, or click to select files
                    </p>
                    <em>(Only *.jpeg and *.png images will be accepted)</em> */}
                        <InputInstructions />
                    </div>
                </section>
            </section>
        </div>
    );
}
