import React from 'react';
import Dropzone from 'react-dropzone';
import InputInstructions from '../components/InputInstructions';

export default function UploadFile(props) {
    
    const multiple = async (e) => {
        let files = Array.from(e.target.files).map((file) => {
            let reader = new FileReader();

            return new Promise((resolve) => {
                // Resolve the promise after reading file
                reader.onload = () => resolve(reader.result);

                // Reade the file as a text
                reader.readAsText(file);
            });
        });

        // At this point you'll have an array of results
        let res = await Promise.all(files);
        console.log(res);
    };
  
    return (
        <div className={props.class}>
            <h2>{props.title}</h2>
            <Dropzone multiple={false} onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section className="Drop">
                    <div {...getRootProps()}>
                    <input {...getInputProps()} 
                    hidden
                    accept=".py"
                    multiple
                    type="file"
                    // value={selectedFile}
                    onChange={multiple}
                    />
                    <InputInstructions/>
                    </div>
                </section>
            )}
            </Dropzone>
        </div>
  )
}
