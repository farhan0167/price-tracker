import Card from 'react-bootstrap/Card';
import PriceFluctuation from './Historical';

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
          {data.hasOwnProperty('priceCh') && (
            <>
              Price Today: $ {data.priceCh[data.priceCh.length - 1]}
            </>
          )}
          </Card.Text>
          <Card.Text style={{'marginLeft': '10px'}}>
            Target Price: $ {(data.price * (1+(data.target/100))).toFixed(2)}
          </Card.Text>
        </div>
        
        <PriceFluctuation productData={data}/>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;