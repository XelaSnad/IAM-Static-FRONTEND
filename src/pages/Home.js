// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import UploadFile from '../components/UploadFile';
import logo from '../assets/Transparent.png';
import '../css/Home.css';
import { CopyBlock, dracula } from 'react-code-blocks';

export default function Home() {
    const [policy, setPolicy] = useState('');
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
            <div className="Upload">
                <UploadFile
                    orientation="Left"
                    title="New Policy"
                    policy={policy}
                    setPolicy={setPolicy}
                />
                <div
                    class="ignore-css"
                    style={{ textAlign: 'left', minWidth: '100%' }}
                >
                    <CopyBlock
                        text={policy ? policy : ''}
                        // showLineNumbers={showLineNumbers}
                        theme={dracula}
                        codeBlock
                        // style={{ textAlign: 'left' }}
                    />
                </div>
                {/* <UploadFile orientation="Right" title="Current Policy" /> */}
            </div>
        </div>
    );
}
