import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LineChart } from './Charttest';

function PriceFluctuation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Track Price Change
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Price History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <LineChart chartData={props.productData}/>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PriceFluctuation;