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
  const [selectedCountry, setSelectedCountry] = useState("")
  const [destinations, setDestinations] = useState([])
  const [selectedState, setSelectedState] = useState("")
  useEffect(() => {
      const response = fetch('https://api.countrystatecity.in/v1/countries', requestOptions)
      .then((response)=> response.json())
      .then((data)=> {setDestinations(data)})
  }, [])

  const [states, setStates] = useState([])
  useEffect(() => {
    setStates([]);
    console.log(selectedCountry)
    if (selectedCountry === ""){return}
    const response = fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, requestOptions)
    .then((response)=> response.json())
    .then((data)=> {setStates(data)})
  }, [selectedCountry])

  const [cities, setCity] = useState([])
  useEffect(() => {
    setCity([]);

    console.log(selectedState)
    if (selectedState === ""){return}
    const response = fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, requestOptions)
    .then((response)=> response.json())
    .then((data)=> {setCity(data)})
  }, [selectedState, selectedCountry])


  const destinationOptions = destinations.map((dest, index)=> {
    return <option key={dest.iso2} value={dest.iso2}>{dest.name}</option>
  })
  //   const stateOptions = states.map((dest, index)=> {
  //     return <option key={dest.iso2} value={index}>{dest.name}</option>
  // })
  const stateOptions = states.map((dest) => (
    <option key={dest.iso2} value={dest.iso2}>{dest.name}</option>
  ));
  const cityOptions = cities.map((dest, index)=> {

    return <option key={dest.name} value={index}>{dest.name}</option>

})
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
      <Card.Text>
         Lets Pick A Place To Go!
         </Card.Text>
        <Card.Title>Destinations</Card.Title>
        <Form.Select onChange={(e)=> {setSelectedCountry(e.target.value); console.log(e.target.value)}} aria-label="Default select example">
            <option>Pick A Country</option>
          {destinationOptions}
        </Form.Select>
        <Form.Select disabled={states.length === 0} onChange={(e) => { setSelectedState(e.target.value); console.log(e.target.value) }} aria-label="Default select example">
          <option>Pick A State</option>
          {stateOptions}
        </Form.Select>
        <Form.Select disabled={cities.length === 0} >
          <option>Pick A City</option>
          {cityOptions}
        </Form.Select>
      </Card.Body>
    </Card>
  );
}
export default BasicExample;