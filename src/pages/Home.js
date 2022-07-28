// import logo from './logo.svg';
import React, { useState } from 'react';
import Diff from '../components/Diff';
import UploadFile from '../components/UploadFile';
import logo from '../assets/Transparent.png';
import "../css/Home.css"


export default function Home() {

    return (
        <div className="Home">
            <img src={logo}/>
            <div className="Description">
               <p>
                    Welcome to IAM Static, your very own IAM policy generator that
                    enforces least privilege!
                    <br></br>
                    Currently we only support python boto3 scripts to generate your IAM
                    policy files but stay tuned!
                    <br></br>
                </p>
            </div>
            <div className="Upload">
                <UploadFile class="Left" title="New Policy" />
                <UploadFile class="Right" title="Current Policy"/>

            </div>
            <div>
                <Diff/>
            </div>
        </div>
    );
}
