import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './recepients.css'; 

const Recipients = () => {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Recipients');
        setRecipients(response.data);
      } catch (error) {
        console.error('Error fetching the recipients data', error);
      }
    };

    fetchRecipients();
  }, []);

  return (
    <Container fluid>
      <div className="headings-container">
        <h1 className="headings">Recipients</h1>
      </div>
      <Row className="recipients-container">
        {recipients.map(recipient => (
          <div className="recipient-card" key={recipient.id}>
            <Card>
              <Card.Img variant="top" src={recipient['image-url']} alt={recipient.Name} />
              <Card.Body>
                <Card.Title>{recipient.Name}</Card.Title>
                <Card.Text>
                  Age: {recipient.Age}
                  <br />
                  Blood Type Received: {recipient['Blood-type-recieved']}
                  <br />
                  Donor's Name: {recipient['Donors-Name']}
                  <br />
                  Last Received On: {recipient['Last-Recieved-On']}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = `tel:${recipient['Contact-details']['Contact-Number']}`}
                >
                  Call 
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Recipients;
