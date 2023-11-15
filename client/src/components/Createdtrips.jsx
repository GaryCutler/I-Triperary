import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

function CreatedTripOne() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const tripData = [
    {
      imgSrc: "holder.js/100px180",
      title: "City 1",
      text: "Some quick example text for City 1.",
    },
    {
      imgSrc: "holder.js/100px180",
      title: "City 2",
      text: "Some quick example text for City 2.",
    },
    {
      imgSrc: "holder.js/100px180",
      title: "City 3",
      text: "Some quick example text for City 3.",
    },
  ];

  const handleGoToTrip = (trip) => {
    setSelectedTrip(trip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTrip(null);
  };

  return (
    <div className="left-component">
      {tripData.map((trip, index) => (
        <Card key={index} style={{ width: '18rem', marginBottom: '20px' }}>
          <Card.Img variant="top" src={trip.imgSrc} />
          <Card.Body>
            <Card.Title>{trip.title}</Card.Title>
            <Card.Text>{trip.text}</Card.Text>
            <Button variant="primary" onClick={() => handleGoToTrip(trip)}>
              Go To Trip
            </Button>
          </Card.Body>
        </Card>
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTrip?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedTrip?.text}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreatedTripOne;
