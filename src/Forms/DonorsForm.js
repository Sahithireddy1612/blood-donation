import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../components/projectsubmit";
import "./donorsform.css";

const BloodDonorForm = () => {
  const [donor, setDonor] = useState({
    Name: "",
    Age: "",
    "Blood-type": "",
    "Contact-details": {
      "Contact-Number": "",
      "Email": ""
    },
    "last-donated": "",
    "image-url": ""
  });
  const [errors, setErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name in donor['Contact-details']) {
      setDonor({ ...donor, "Contact-details": { ...donor["Contact-details"], [name]: value } });
    } else {
      setDonor({ ...donor, [name]: value });
    }
  };

  const validation = () => {
    let errors = {};
    if (donor.Name.length > 30) {
      errors.Name = "NAME MUST BE LESS THAN 30 CHARACTERS!!";
    }
    if (!donor["Contact-details"].Email.includes("@")) {
      errors.Email = "Invalid Email Address!!";
    }
    if (donor["Contact-details"]["Contact-Number"].length !== 10) {
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
        const response = await axios.post("http://localhost:3001/Donors", donor, {
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
          <h1>Donor Registration</h1>
          <h2>Join our cause</h2>
          <h3>Help save lives by donating blood</h3>
        </div>
        <div className="card">
          <div className="card-header">DONOR REGISTRATION FORM :</div>
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
                  value={donor.Name}
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
                  value={donor.Age}
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
                  value={donor["Blood-type"]}
                  onChange={handleChange}
                />
                {errors["Blood-type"] && <div className="invalid-feedback">{errors["Blood-type"]}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Contact-Number">Contact Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors.ContactNumber ? "is-invalid" : ""}`}
                  id="Contact-Number"
                  name="Contact-Number"
                  placeholder="Enter contact number"
                  value={donor["Contact-details"]["Contact-Number"]}
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
                  value={donor["Contact-details"].Email}
                  onChange={handleChange}
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="last-donated">Last Donated:</label>
                <input
                  type="text"
                  className={`form-control ${errors["last-donated"] ? "is-invalid" : ""}`}
                  id="last-donated"
                  name="last-donated"
                  placeholder="Enter last donated time"
                  value={donor["last-donated"]}
                  onChange={handleChange}
                />
                {errors["last-donated"] && <div className="invalid-feedback">{errors["last-donated"]}</div>}
              </div>

              {registrationMessage && (
                <div className={`alert ${registrationMessage.includes("SUCCESSFUL") ? "alert-success" : "alert-danger"}`}>
                  {registrationMessage}
                </div>
              )}

              <SubmitButton handleSubmit={handleSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonorForm;
