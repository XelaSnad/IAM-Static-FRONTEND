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

    const handleOnDrop = async (files) => {
        // console.log(files);
        // const formData = new FormData();

        let content = Array.from(files).map((file) => {
            let reader = new FileReader();
            return new Promise((resolve) => {
                reader.onload = () => resolve(reader.result);
                reader.readAsText(file);
            });
        });
        let res = await Promise.all(content);
        console.log(res);
        // console.log(stuff);
        let stuff = {
            ting: res,
        };
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            // body: JSON.stringify(penis),
            body: JSON.stringify(stuff),
        };
        let uri =
            'https://fz41s9yjre.execute-api.ap-southeast-2.amazonaws.com/test/triggerscriptanalyzer';

        fetch(uri, requestOptions)
            .then((e) => {
                console.log(e);
                return e.json();
            })
            .then((e) => {
                console.log(e);
                console.log(JSON.stringify(e.body));
                setPolicy(JSON.stringify(e.body));
            })
            .catch((e) => {
                console.log(e);
            });
        // console.log(typeof formData.get('hello.py'));
        // const zip = require('jszip')();
        // for (let i = 0; i < files.length; i++) {
        //     zip.file(files[i].name, files[i]);
        // }

        // let uri =
        //     'https://fz41s9yjre.execute-api.ap-southeast-2.amazonaws.com/test/triggerscriptanalyzer';
        // zip.generateAsync({ type: 'blob' }).then((blob) => {
        //     let requestOptions = {
        //         method: 'POST',
        //         'Access-Control-Allow-Origin': '*',
        //         'Access-Control-Allow-Methods': '*',
        //         'Access-Control-Allow-Headers': '*',
        //         // 'Access-Control-Allow-Headers': 'Authorization, Content-Type',
        //         redirect: 'follow',
        //     };
        //     fetch(uri, requestOptions)
        //         .then((e) => {
        //             console.log(e);
        //             return e.json();
        //         })
        //         .then((e) => {
        //             console.log(e);
        //             console.log(JSON.stringify(e.body));
        //             setPolicy(JSON.stringify(e.body));
        //         })
        //         .catch((e) => {
        //             console.log(e);
        //         });

        // });
    };
    return (
        <div className={props.class}>
            <div>{policy}</div>
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
