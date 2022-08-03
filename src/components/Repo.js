import { useState } from "react";
import React from 'react'

function Repo({policy, setPolicy}) {
    const [message, setMessage] = useState('');

    const handleChange = event => {
        setMessage(event.target.value);
    }

    const handleSubmit = event => {
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'text' },
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            body: JSON.stringify(message)
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
            

            console.log(event)
    }
    

   
  
    return (
    <div>
        <input placeholder="Enter a Github Repositry" type="text" onChange={handleChange} value={message}/>
        <button onClick={handleSubmit}>Submit Big Boy</button>
    </div>
  )
}

export default Repo