import React from 'react';
import Img from '../assets/python.png';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function InputInstructions() {
    return (
        <div className="InputInstructions" style={{ display: 'flex' }}>
            <div className="InputInstructionsLogo">
                <img src={Img} height="60px" />
            </div>
            <div>
                Drop a Boto3 File here or
                <br />
                <UploadFileIcon />
                Open from file
            </div>
        </div>
    );
}

export default InputInstructions;
