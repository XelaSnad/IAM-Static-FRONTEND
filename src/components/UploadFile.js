// import React from 'react';
import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';
import Fetch from 'fetch';

export default function UploadFile(props) {
    // let { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    //     useDropzone({
    //         accept: ['.py'],
    //     });
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'text/python': ['.py'],
        },
        onDrop: (e) => {
            handleOnDrop(e);
        },
        // multiple: 'True',
    });
    // console.log(acceptedFiles);
    let filekey = Math.floor(Math.random() * 1000000000);
    const filename = filekey.toString();
    let content = null;

    const handleOnDrop = (files) => {
        const zip = require('jszip')();
        console.log(files);
        console.log('fk me ');
        for (let i = 0; i < files.length; i++) {
            zip.file(files[i].name, files[i]);
        }

        let uri =
            'https://2ivhlotb6k.execute-api.us-east-1.amazonaws.com/dev/static-iam-store-simplified/';
        zip.generateAsync({ type: 'blob' }).then((blob) => {
            // 1) generate the zip file
            // console.log(blob);
            // fetch('google.com').then((e) => console.log(e));
            // fetch ()
        });

        // fetch(
        //     `https://2ivhlotb6k.execute-api.us-east-1.amazonaws.com/dev/static-iam-store-simplified/${filename}.zip`,
        //     {
        //         method: 'PUT',
        //         headers: {},
        //     }
        // ).then((res) => {
        //     if (res.ok) {
        //         console.log('HTTP PUT SUCCESS');
        //     } else {
        //         console.log('HTTP PUT FAIL');
        //     }
        // });
    };

    // return (
    //     <div className={props.class}>
    //         <h2>{props.title}</h2>
    //         <Dropzone multiple={true} onDrop={handleOnDrop}>
    //             {({ getRootProps, getInputProps }) => (
    //                 <section className="Drop">
    //                     <div {...getRootProps()}>
    //                         <input
    //                             {...getInputProps()}
    //                             hidden
    //                             // accept=".py"
    //                             multiple
    //                             type="file"
    //                         />
    //                         <InputInstructions />
    //                     </div>
    //                 </section>
    //             )}
    //         </Dropzone>
    //     </div>
    // );
    return (
        <div className={props.class}>
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
