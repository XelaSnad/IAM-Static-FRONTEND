// import React from 'react';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
import Button from '@mui/material/Button';
import CheckBoxList from '../components/CheckBoxList';
import Repo from './Repo';

export default function UploadFile({
    input,
    setInput,
    orientation,
    title,
    policy,
    setPolicy,
    checked,
    setChecked,
}) {
    // deconstruct properties from dropzone
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/python': ['.py'],
        },
        onDrop: (e) => {
            handleOnDrop(e);
        },
    });

    // function generates policy on the frontend
    const generatePolicy = () => {
        let filteredFiles = Object.keys(input)
            .filter((key) => checked.includes(key))
            .reduce((obj, key) => {
                obj[key] = input[key];
                return obj;
            }, {});

        // makes request headers and body
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',

            body: JSON.stringify({
                ting: Object.values(filteredFiles),
            }),
        };
        // sets the url for the lambda function
        // THIS NEEDS TO BE CHANGED FOR EVERY DEPLOYMENT OF THE LAMBDA FUNCTION
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

    // Takes in the files and returns a dictionary of name of file and filecontent
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
    };
    return (
        <div className={orientation}>
            <h2>{title}</h2>
            <section className="Drop">
                <section className="container">
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} hidden />
                        <InputInstructions />
                    </div>
                </section>
            </section>
            <br />
            <CheckBoxList
                input={input}
                setInput={setInput}
                checked={checked}
                setChecked={setChecked}
            />
            <br />
            {checked.length == 0 ? (
                <Button
                    variant="contained"
                    disabled
                    size="large"
                    style={{ width: '35vw' }}
                >
                    Generate Policy
                </Button>
            ) : (
                <Button
                    variant="contained"
                    onClick={generatePolicy}
                    size="large"
                    style={{
                        width: '35vw',
                        background: '#d6bd54',
                        color: 'black',
                    }}
                >
                    Generate Policy
                </Button>
            )}

            <h1 style={{ color: 'white' }}>OR</h1>

            <Repo
                policy={policy}
                setPolicy={setPolicy}
                title="Generate Policy via Repo"
            />
        </div>
    );
}
