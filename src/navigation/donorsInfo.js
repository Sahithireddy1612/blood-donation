import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './donorsinfo.css';

const Donors = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Donors'); 
        
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching the donors data', error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <Container fluid>
      <div className="heading-container">
        <h1 className="heading">Our Donors</h1>
      </div>
      <Row className="donors-container">
        {donors.map(donor => (
          <div className="donor-card" key={donor.id}>
            <Card>
              <Card.Img variant="top" src={donor['image-url']} alt={donor.Name} />
              <Card.Body>
                <Card.Title>{donor.Name}</Card.Title>
                <Card.Text>
                  Age: {donor.Age}
                  <br />
                  Blood Type: {donor['Blood-type']}
                  <br />
                  Last Donated: {donor['last-donated']}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = `tel:${donor['Contact-details']['Contact-Number']}`}
                >
                  Call Or Message
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Donors;
