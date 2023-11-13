import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
//c1hDR1NzWWVvczdudmZMVkU0eElZZTdrZXlOS0gyRkdTVThyd1A5Zw==


function createdTripOne() {
  return (
    <Card className= "left-component" style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go To Trip</Button>
      </Card.Body>

      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go To Trip</Button>
      </Card.Body>

      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go To Trip</Button>
      </Card.Body>
    </Card>
  );
}

export default createdTripOne;