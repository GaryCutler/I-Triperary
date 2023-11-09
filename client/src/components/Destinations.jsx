import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
var headers = new Headers();
headers.append("X-CSCAPI-KEY", "c1hDR1NzWWVvczdudmZMVkU0eElZZTdrZXlOS0gyRkdTVThyd1A5Zw==");

var requestOptions = {
method: 'GET',
headers: headers,
redirect: 'follow'
};


function BasicExample() {
  const [destinations, setDestinations] = useState([])
  useEffect(() => {
      const response = fetch('https://api.countrystatecity.in/v1/countries', requestOptions)
      .then((response)=> response.json())
      .then((data)=> {setDestinations(data)})
  }, [])
  const destinationOptions = destinations.map((dest, index)=> {
    return <option value={index}>{dest.name}</option>
  })

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Destinations</Card.Title>
        <Form.Select aria-label="Default select example">
            <option>Open this select menu</option>
            {destinationOptions}
        </Form.Select>

        <Card.Text>
          helloworld
        </Card.Text>
      </Card.Body>
    </Card>

  );
}


export default BasicExample;
