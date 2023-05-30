import React, { useEffect } from 'react'
import { useState } from 'react';
import {Container, Row} from 'react-bootstrap'
import ItemCard from './Item';
import { AddItem } from './AddItem';

const Landing = (props) => {
    const [data, setData] = useState(null)
    const username = props.userData.username


    useEffect(() => {
        const messageToSend = {
            "username": props.userData.username
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
    }, [props.userData.username])
    
  return (
    
    <React.Fragment>
        <Container>
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
        <AddItem username={username}/>
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