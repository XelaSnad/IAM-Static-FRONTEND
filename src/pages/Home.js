// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import UploadFile from '../components/UploadFile';
import CheckBoxList from '../components/CheckBoxList';
import logo from '../assets/Transparent.png';
import Repo from '../components/Repo';
import '../css/Home.css';
import { CopyBlock, dracula } from 'react-code-blocks';
import Button from '@mui/material/Button';

// import { minWidth } from '@mui/system';

export default function Home() {
    // const
    const [checked, setChecked] = React.useState([]);
    const [input, setInput] = useState({});
    const [policy, setPolicy] = useState('');
    const downloadTxtFile = () => {
        const element = document.createElement('a');
        const file = new Blob([policy], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        element.download = 'policy.txt';
        document.body.appendChild(element);
        element.click();
    };
    return (
        <div className="Home">
            <img src={logo} />
            <div className="Description">
                <p>
                    Welcome to IAM Static, your very own IAM policy generator
                    that enforces least privilege!
                    <br></br>
                    Currently we only support python boto3 scripts to generate
                    your IAM policy files but stay tuned!
                    <br></br>
                </p>
            </div>


            <div>
                {/* {checked} */}
                <div className="Upload">
                    <UploadFile
                        orientation="Left"
                        title="Generate Policy"
                        policy={policy}
                        setPolicy={setPolicy}
                        input={input}
                        setInput={setInput}
                        checked={checked}
                        setChecked={setChecked}

                    />
                    {/* <div>hello</div> */}
                    <div
                        class="ignore-css"
                        style={{
                            textAlign: 'left',
                            width: '35vw',
                            paddingTop: '70px',
                        }}
                    >
                        <CopyBlock
                            text={policy ? policy : ''}
                            theme={dracula}
                            codeBlock
                        />
                        <br></br>
                        {policy ? (
                            <Button
                                variant="contained"
                                onClick={downloadTxtFile}
                                size="large"
                                style={{
                                    width: '35vw',
                                    background: '#d6bd54',
                                    color: 'black',
                                }}
                            >
                                Download Policy
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                disabled
                                size="large"
                                style={{ width: '35vw' }}
                            >
                                Download Policy
                            </Button>
                        )}
                    </div>
                    {/* <CheckBoxList input={input} setInput={setInput} /> */}
                </div>
            </div>
        </div>
    );
}
