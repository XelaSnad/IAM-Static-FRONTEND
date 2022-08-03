// import React from 'react';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
// import Fetch from 'fetch';
// import { CopyBlock, dracula } from 'react-code-blocks';
import Button from '@mui/material/Button';
import CheckBoxList from '../components/CheckBoxList';

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
    // let [policy, setPolicy] = useState('');
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/python': ['.py'],
        },
        onDrop: (e) => {
            handleOnDrop(e);
        },
    });
    const generatePolicy = () => {
        // let filtered = Object.values(input).reduce()
        let filteredFiles = Object.keys(input)
            .filter((key) => checked.includes(key))
            .reduce((obj, key) => {
                obj[key] = input[key];
                return obj;
            }, {});
        // console.log(filteredFiles);

        let stuff = {
            ting: Object.values(filteredFiles),
        };
        // console.log(stuff);
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
        // let stuff = {
        //     ting: res,
        // };
        // let requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'multipart/form-data' },
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': '*',
        //     'Access-Control-Allow-Headers': '*',

        //     body: JSON.stringify(stuff),
        // };
        // let uri =
        //     'https://fz41s9yjre.execute-api.ap-southeast-2.amazonaws.com/test/triggerscriptanalyzer';

        // fetch(uri, requestOptions)
        //     .then((e) => {
        //         console.log(e);
        //         return e.json();
        //     })
        //     .then((e) => {
        //         console.log(e);
        //         setPolicy(JSON.stringify(JSON.parse(e.body), null, 4));
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //     });
    };
    return (
        <div className={orientation}>
            {/* {JSON.stringify(input)} */}
            {/* {checked} */}
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
            {/* <Button
                variant="contained"
                onClick={generatePolicy}
                size="large"
                style={{ width: '35vw', background: '#d6bd54', color: 'black' }}
            >
                Generate Policy
            </Button> */}
            {/* {checked.length == 0 ? <div>fk you </div> : <div></div>} */}
        </div>
    );
}
