import React, { useEffect } from 'react'
import { useState } from 'react';
import {Container, Row} from 'react-bootstrap'
import ItemCard from './Item';
import { AddItem } from './AddItem';

const Landing = (props) => {
    const [data, setData] = useState(null)
    const username = props.userData.username
    const [responseData, setResponseData] = useState(null)
    const [canAdd, setCanAdd] = useState(false) //initial state of whether client can add items


    const CACHE_DURATION = 5 * 60 * 1000; // 15 minutes in milliseconds

    const handleResponse = (data_res) => {
        /* Process children popup data, and append it to data state */
        setResponseData(data_res);
        
        setData((prevData) =>[...prevData, data_res.data])
        //Place appended data in cache by evicting old data
        localStorage.setItem('data', JSON.stringify([...data, data_res.data]));
        localStorage.setItem('timestamp', new Date().getTime());
    }


    useEffect(() => {
        const messageToSend = {
            "username": props.userData.username
        }
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(messageToSend)
        };
        //Implement Cache: Check if cached data exists in local storage and if it has expired
        const cachedData = localStorage.getItem('data');
        const cachedTimestamp = localStorage.getItem('timestamp');
        if (cachedData && cachedTimestamp) {
            const currentTime = new Date().getTime();
            //is difference between curr time and cached timestamp over the caching duration?
            if (currentTime - cachedTimestamp <= CACHE_DURATION) {
                setData(JSON.parse(cachedData));
                return;
            }
        }
        //cache was invalid, make request to DynamoDB
        fetch("https://ifqldng21c.execute-api.us-east-1.amazonaws.com/dev/get-items", requestOptions)
        .then(res => res.json())
        .then(data_res =>{
            setData(data_res)
            //add a validation mechanism
            if (data_res.length < 1) {
                //only allow 1 item
                setCanAdd(true)
            }
            //Store Item in Cache->reduce Dynamo Reads
            localStorage.setItem('data', JSON.stringify(data_res));
            localStorage.setItem('timestamp', new Date().getTime());
        })
    }, [props.userData.username])
    
  return (
    
    <React.Fragment>
        <Container style={{'marginTop':'50px'}}>
            {data? (
                data.map(item =>(
                    <Row style={{ marginBottom: '10px' }}>
                        <ItemCard trackingInfo={item}/>
                    </Row>
                ))
            ): (
                <p>Loading...</p>
            )}
        </Container>
        {/*Pass onResponse down to children popup, get data and process in parent*/}
        {canAdd==true ?
            <AddItem username={username} onResponse={handleResponse}/> 
            : "You reached the limit of items you can track"
        }
        
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