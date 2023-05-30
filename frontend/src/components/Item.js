import Card from 'react-bootstrap/Card';

function ItemCard(props) {
  const data = props.trackingInfo

  return (
    <Card style={{ width: '100%', 'textAlign': 'left'}}>
      <Card.Body>
        <a href={data.url} target='_blank'><Card.Title>{data.custom_name}</Card.Title></a>
        <Card.Subtitle className="mb-2 text-muted">
          {(data.product? data.product : "")}
        </Card.Subtitle>
        <div style={{'display': 'flex'}}>
          <Card.Text>
            Original Price: $ {data.price}
          </Card.Text>
          <Card.Text style={{'marginLeft': '10px'}}>
            Target Price: $ {(data.price * (1-data.target)).toFixed(2)}
          </Card.Text>
        </div>
        <Card.Link href="#">Track Price Change</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;