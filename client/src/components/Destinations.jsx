import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DateContainer from './datePicker'; 
import "react-datepicker/dist/react-datepicker.css";

var headers = new Headers();
headers.append("X-CSCAPI-KEY", "c1hDR1NzWWVvczdudmZMVkU0eElZZTdrZXlOS0gyRkdTVThyd1A5Zw==");

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

function TripAll() {
    const [selectedCountry, setSelectedCountry] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [savedDestinations, setSavedDestinations] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const response = fetch('https://api.countrystatecity.in/v1/countries', requestOptions)
            .then((response) => response.json())
            .then((data) => { setDestinations(data) });
    }, []);

    useEffect(() => {
        setStates([]);
        if (selectedCountry === "") { return; }
        const response = fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, requestOptions)
            .then((response) => response.json())
            .then((data) => { setStates(data) });
    }, [selectedCountry]);

    useEffect(() => {
        setCities([]);
        if (selectedState === "") { return; }
        const response = fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, requestOptions)
            .then((response) => response.json())
            .then((data) => { setCities(data) });
    }, [selectedState, selectedCountry]);

    const destinationOptions = destinations.map((dest, index) => (
        <option key={dest.iso2} value={dest.iso2}>{dest.name}</option>
    ));

    const stateOptions = states.map((dest) => (
        <option key={dest.iso2} value={dest.iso2}>{dest.name}</option>
    ));

    const cityOptions = cities.map((dest, index) => (
        <option key={dest.name} value={dest.name}>{dest.name}</option>
    ));

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleSave = () => {
        if (savedDestinations.length < 5) {
            const savedDestinationText = `Country: ${selectedCountry}, State: ${selectedState}, City: ${selectedCity}, Start Date: ${startDate.toDateString()}, End Date: ${endDate.toDateString()}`;
            setSavedDestinations([...savedDestinations, savedDestinationText]);
            setSelectedCountry("");
            setSelectedState("");
            setSelectedCity("");
            setCities([]);
            setStartDate(new Date());
            setEndDate(new Date());
        } else {
            alert("You can save up to five destinations.");
        }
    };

    return (
        <div className="d-flex">
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Text>
                        Let's Pick A Place To Go!
                    </Card.Text>
                    <Card.Title>Destinations</Card.Title>
                    <Form.Select onChange={(e) => { setSelectedCountry(e.target.value); console.log(e.target.value) }} aria-label="Default select example">
                        <option>Pick A Country</option>
                        {destinationOptions}
                    </Form.Select>
                    <Form.Select disabled={states.length === 0} onChange={(e) => { setSelectedState(e.target.value); console.log(e.target.value) }} aria-label="Default select example">
                        <option>Pick A State</option>
                        {stateOptions}
                    </Form.Select>
                    <Form.Select disabled={cities.length === 0} onChange={(e) => { setSelectedCity(e.target.value); console.log(e.target.value) }} aria-label="Default select example">
                        <option>Pick A City</option>
                        {cityOptions}
                    </Form.Select>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Card.Body>
            </Card>

            <Card style={{ width: '18rem', marginLeft: '20px' }}>
                <Card.Body>
                    <Card.Title>Saved Destinations</Card.Title>
                    <ul>
                        {savedDestinations.map((dest, index) => (
                            <li key={index}>{dest}</li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>

            <DateContainer onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} />
        </div>
    );
}

export default TripAll;