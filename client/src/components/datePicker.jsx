
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Card from 'react-bootstrap/Card';
import "react-datepicker/dist/react-datepicker.css";

function ContainerExample() {
    const [startDate, setStartDate] = useState(new Date());
  return (
    <Card  style={{ width: '18rem'  }}
    className="mb-2 l-5">
  <Card.Body>
    <Card.Text variant="top">Select What days you would like to travel!</Card.Text>
  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
  </Card.Body>
</Card>
  );
}

export default ContainerExample;


