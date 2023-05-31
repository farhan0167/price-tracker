import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import NumericInput from 'react-numeric-input';

export function AddItem(props) {
  const [show, setShow] = useState(false);
  const [targetVal, setTargetVal] = useState(0.00)
  const [curPrice, setCurPrice] = useState(0.00)
  const [targetPerct, setTargetPerct] = useState(0.00)
  const [prodName, setProdName] = useState("")
  const [url, setUrl] = useState("")
  const username = props.username

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleProdNameChange(e){
    e.preventDefault()
    setProdName(e.target.value)
  }
  function handleURLChange(e){
    e.preventDefault()
    setUrl(e.target.value)
  }
  
  function handleChange(value){
    setTargetVal(value)
    const newValue = ((value-curPrice)/curPrice)*100; // Modify the value as needed
    setTargetPerct(newValue.toFixed(2))
  }
  function handleChangePrice(value){
    //e.preventDefault()
    setCurPrice(value)
    setTargetVal(curPrice)
  }
  function handleSubmit(e){
    e.preventDefault()
    const dataToSend = {
        url: url,
        username: username,
        custom_name: prodName,
        target: parseFloat(targetPerct)
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToSend)
    };
    const endpoint = "https://ifqldng21c.execute-api.us-east-1.amazonaws.com/dev/store-items"
    fetch(endpoint, requestOptions)
    .then(res => res.json())
    .then(dataRes => {
        //console.log(dataRes)
        props.onResponse(dataRes)
        setShow(false)
    })
    //console.log(dataToSend)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
            Add Item to Track
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Product Name</Form.Label>
                <Form.Control onChange={handleProdNameChange} type="text" placeholder="Enter custom product name" value={prodName}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>URL</Form.Label>
                <Form.Control onChange={handleURLChange} type="text" placeholder="Enter the url of the product" value={url}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Current Price ($)</Form.Label>
                <NumericInput
                         className="form-control" step={0.1} precision={2} placeholder="Enter the current price of the product"
                         onChange={handleChangePrice} value={curPrice}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Target  ($)</Form.Label>
                <div style={{'display': 'flex'}}>
                    <NumericInput
                         className="form-control" step={0.1} precision={2} placeholder="Enter your price target in $"
                         onChange={handleChange} value={targetVal}
                    />
                    <Form.Control  disabled type="text" value={targetPerct}/>
                    <p>%</p>
                </div>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

//render(<AddItem />);