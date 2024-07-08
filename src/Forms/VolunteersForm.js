import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../components/projectsubmit";
import { db } from '../firebase/firebase'; // Adjust the path as per your project structure
import { collection, addDoc } from 'firebase/firestore';
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
      errors.Name = "Name must be less than 30 characters!";
    }
    if (!volunteer.Email.includes("@")) {
      errors.Email = "Invalid Email Address!";
    }
    if (volunteer.ContactNumber.length !== 10) {
      errors.ContactNumber = "Phone number must be 10 digits";
    }
    if (volunteer.Age.length !== 2) {
      errors.Age = "Age must be exactly 2 digits";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      try {
        const docRef = await addDoc(collection(db, 'volunteers'), volunteer);
        console.log("Volunteer registration successful with ID: ", docRef.id);
        setRegistrationMessage("REGISTRATION SUCCESSFUL");
        navigate('/submitted');
      } catch (error) {
        console.error("Error adding volunteer: ", error);
        setRegistrationMessage("REGISTRATION FAILED");
      }
    }
  };

  // Dropdown options for blood type
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
                  required
                />
                {errors.Name && <div className="invalid-feedback">{errors.Name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Age">Age:</label>
                <input
                  type="number"
                  className={`form-control ${errors.Age ? "is-invalid" : ""}`}
                  id="Age"
                  name="Age"
                  placeholder="Enter age"
                  value={volunteer.Age}
                  onChange={handleChange}
                  min="18"
                  max="65"
                  maxLength="2"
                  required
                />
                {errors.Age && <div className="invalid-feedback">{errors.Age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Blood-type">Blood Type:</label>
                <select
                  className={`form-control ${errors["Blood-type"] ? "is-invalid" : ""}`}
                  id="Blood-type"
                  name="Blood-type"
                  value={volunteer["Blood-type"]}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select blood type</option>
                  <option value="A+">A-Positive</option>
                  <option value="A-">A-Negative</option>
                  <option value="B+">B-Positive</option>
                  <option value="B-">B-Negative</option>
                  <option value="AB+">AB-Positive</option>
                  <option value="AB-">AB-Negative</option>
                  <option value="O+">O-Positive</option>
                  <option value="O-">O-Negative</option>
                </select>
                {errors["Blood-type"] && <div className="invalid-feedback">{errors["Blood-type"]}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="ContactNumber">Contact Number:</label>
                <input
                  type="tel"
                  className={`form-control ${errors.ContactNumber ? "is-invalid" : ""}`}
                  id="ContactNumber"
                  name="ContactNumber"
                  placeholder="Enter contact number (10 digits)"
                  value={volunteer.ContactNumber}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
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
                  required
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
