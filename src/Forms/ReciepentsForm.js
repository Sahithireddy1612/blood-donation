import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../components/projectsubmit";
import "./recepientsform.css";

const RecipientsForm = () => {
  const [recipient, setRecipient] = useState({
    Name: "",
    Age: "",
    "Blood-type-needed": "",
    "Contact-Number": "",
    Email: "",
    "Required-On": ""
  });
  const [errors, setErrors] = useState({});
  const [registrationMessage, setRegistrationMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipient({ ...recipient, [name]: value });
  };


  const handleAgeChange = (event) => {
    const { value } = event.target;
    if (value.length <= 2) {
      setRecipient({ ...recipient, Age: value });
    }
  };
  const validation = () => {
    let errors = {};
    if (recipient.Name.length > 30) {
      errors.Name = "Name must be less than 30 characters";
    }
    if (!recipient.Email.includes("@")) {
      errors.Email = "Invalid Email Address";
    }
    if (recipient["Contact-Number"].length !== 10) {
      errors.ContactNumber = "Phone number must be exactly 10 digits";
    }

    const ageRegex = /^\d{1,2}$/;
    if (!ageRegex.test(recipient.Age)) {
      errors.Age = "Age must be one or two digits";
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(recipient["Required-On"])) {
      errors["Required-On"] = "Invalid date format (MM/DD/YYYY)";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setRegistrationMessage("Registration failed: Please check your information.");
    } else {
      setErrors({});
      try {
        await addDoc(collection(db, "recipients"), recipient);
        setRegistrationMessage("Registration successful");
        navigate('/submitted'); 
      } catch (error) {
        console.error("Registration failed:", error);
        setRegistrationMessage("Registration failed");
      }
    }
  };

  return (
    <div className="form">
      <div className="form-container">
        <div className="form-header">
          <h1>Recipient Registration</h1>
          <h3>Save Lives By Receiving Blood</h3>
        </div>
        <div className="card">
          <div className="card-header">RECIPIENT REGISTRATION FORM:</div>
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
                  value={recipient.Name}
                  onChange={handleChange}
                  required
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
                  value={recipient.Age}
                  onChange={handleAgeChange}
                  required
                />
                {errors.Age && <div className="invalid-feedback">{errors.Age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Blood-type-needed">Blood Type Needed:</label>
                <select
                  className={`form-control ${errors["Blood-type-needed"] ? "is-invalid" : ""}`}
                  id="Blood-type-needed"
                  name="Blood-type-needed"
                  value={recipient["Blood-type-needed"]}
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
                {errors["Blood-type-needed"] && <div className="invalid-feedback">{errors["Blood-type-needed"]}</div>}
              </div>


              <div className="form-group">
                <label htmlFor="Contact-Number">Contact Number:</label>
                <input
                  type="tel"
                  className={`form-control ${errors.ContactNumber ? "is-invalid" : ""}`}
                  id="Contact-Number"
                  name="Contact-Number"
                  placeholder="Enter contact number"
                  value={recipient["Contact-Number"]}
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
                  value={recipient.Email}
                  onChange={handleChange}
                  required
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Required-On">Required On (MM/DD/YYYY):</label>
                <input
                  type="date"
                  className={`form-control ${errors["Required-On"] ? "is-invalid" : ""}`}
                  id="Required-On"
                  name="Required-On"
                  placeholder="Enter required date"
                  value={recipient["Required-On"]}
                  onChange={handleChange}
                  required
                />
                {errors["Required-On"] && <div className="invalid-feedback">{errors["Required-On"]}</div>}
              </div>

              {registrationMessage && (
                <div className={`alert ${registrationMessage.includes("successful") ? "alert-success" : "alert-danger"}`}>
                  {registrationMessage}
                </div>
              )}

              <SubmitButton />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientsForm;
