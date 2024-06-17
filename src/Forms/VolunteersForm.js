import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../components/projectsubmit";
import "./volunteersform.css";

const VolunteersForm = () => {
  const [volunteer, setVolunteer] = useState({
    Name: "",
    Age: "",
    "Blood-type": "",
    ContactNumber: "",
    Email: "",

  });
  const [errors, setErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVolunteer({ ...volunteer, [name]: value });
  };

  const validation = () => {
    let errors = {};
    if (volunteer.Name.length > 30) {
      errors.Name = "NAME MUST BE LESS THAN 30 CHARACTERS!!";
    }
    if (!volunteer.Email.includes("@")) {
      errors.Email = "Invalid Email Address!!";
    }
    if (volunteer.ContactNumber.length !== 10) {
      errors.ContactNumber = "PHONE NUMBER MUST BE 10 DIGITS";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      setErrors({});
      try {
        const response = await axios.post("http://localhost:3001/Volunteers", volunteer, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log("Server response after posting:", response.data);
        setRegistrationMessage("REGISTRATION SUCCESSFUL");
        navigate('/submitted');
      } catch (error) {
        console.error("Registration failed:", error);
        setRegistrationMessage("REGISTRATION FAILED");
      }
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <div className="form-header">
          <h1>Volunteers Registration</h1>
          <h2>Join our volunteering program</h2>
        
        </div>
        <div className="card">
          <div className="card-header">VOLUNTEER REGISTRATION FORM :</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Name">Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                  id="Name"
                  name="Name"
                  placeholder="Enter name"
                  value={volunteer.Name}
                  onChange={handleChange}
                />
                {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Age">Age:</label>
                <input
                  type="text"
                  className={`form-control ${errors.Age ? "is-invalid" : ""}`}
                  id="Age"
                  name="Age"
                  placeholder="Enter age"
                  value={volunteer.Age}
                  onChange={handleChange}
                />
                {errors.Age && <div className="invalid-feedback">{errors.Age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Blood-type">Blood Type:</label>
                <input
                  type="text"
                  className={`form-control ${errors["Blood-type"] ? "is-invalid" : ""}`}
                  id="Blood-type"
                  name="Blood-type"
                  placeholder="Enter blood type"
                  value={volunteer["Blood-type"]}
                  onChange={handleChange}
                />
                {errors["Blood-type"] && <div className="invalid-feedback">{errors["Blood-type"]}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="ContactNumber">Contact Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors.ContactNumber ? "is-invalid" : ""}`}
                  id="ContactNumber"
                  name="ContactNumber"
                  placeholder="Enter contact number"
                  value={volunteer.ContactNumber}
                  onChange={handleChange}
                />
                {errors.ContactNumber && <div className="invalid-feedback">{errors.ContactNumber}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Email">Email:</label>
                <input
                  type="email"
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                  id="Email"
                  name="Email"
                  placeholder="Enter email"
                  value={volunteer.Email}
                  onChange={handleChange}
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>

            
             

              <SubmitButton handleSubmit={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteersForm;
