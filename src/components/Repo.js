import { useState } from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Repo({ title, policy, setPolicy }) {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event) => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text' },
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            body: JSON.stringify(message),
        };

        fetch(process.env.REACT_APP_LAMBDA_LINK, requestOptions)
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

        console.log(event);
    };

    return (
        <div>
            <h2 style={{ color: 'white' }}>{title}</h2>
            <TextField
                variant="outlined"
                placeholder="Enter a Github Repositry"
                type="text"
                onChange={handleChange}
                value={message}
                className="Left"
                style={{
                    width: '35vw',
                    background: 'white',
                }}
            />
            <br />
            <br />
            {message ? (
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    size="large"
                    style={{
                        width: '35vw',
                        background: '#d6bd54',
                        color: 'black',
                    }}
                >
                    Generate Policy
                </Button>
            ) : (
                <Button
                    variant="contained"
                    disabled
                    size="large"
                    style={{ width: '35vw' }}
                >
                    Generate Policy
                </Button>
            )}
        </div>
    );
}

export default Repo;
