// import React from 'react';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
// import Fetch from 'fetch';
import { CopyBlock, dracula } from 'react-code-blocks';

export default function UploadFile({
    input,
    setInput,
    orientation,
    title,
    policy,
    setPolicy,
}) {
    // let [policy, setPolicy] = useState('');
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/python': ['.py'],
        },
        onDrop: (e) => {
            handleOnDrop(e);
        },
    });

    const handleOnDrop = async (files) => {
        let content = Array.from(files).map((file) => {
            let reader = new FileReader();
            return new Promise((resolve) => {
                reader.onload = () => {
                    resolve(reader.result);
                    let addOn = {};
                    addOn[file.name] = reader.result;

                    setInput((e) => ({
                        ...e,
                        [file.name]: reader.result,
                    }));
                };
                reader.readAsText(file);
            });
        });
        let res = await Promise.all(content);
        let stuff = {
            ting: res,
        };
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',

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
                setPolicy(JSON.stringify(JSON.parse(e.body), null, 4));
            })
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <div className={orientation}>
            {/* {JSON.stringify(input)} */}
            <h2>{title}</h2>
            <section className="Drop">
                <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} hidden />
                        <InputInstructions />
                    </div>
                </section>
            </section>
        </div>
    );
}
