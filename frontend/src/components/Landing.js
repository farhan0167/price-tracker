import React, { useEffect } from 'react'
import { useState } from 'react';

const Landing = (props) => {
    const [data, setData] = useState(null)


    useEffect(() => {
        const messageToSend = {
            "username": props.data.username
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(messageToSend)
        };
        fetch("https://ifqldng21c.execute-api.us-east-1.amazonaws.com/dev/get-items", requestOptions)
        .then(res => res.json())
        .then(data_res =>{
            setData(data_res)
            
        })
    }, [props.data.username])
    
  return (
    
    <React.Fragment>
        {data? (
            data.map(item =>(
                <div>
                    <p>{item.custom_name}</p>
                    <p>{item.price}</p>
                </div>
            ))
        ): (
            <p>Loading...</p>
        )}
    </React.Fragment>
    
  )
}

export default Landing

/**
 * 
 * {data? (
            data.map(item =>(
                <div>
                    <p>{item.custom_name}</p>
                    <p>{item.price}</p>
                </div>
            ))
        ): (
            <p>Loading...</p>
        )}
 */