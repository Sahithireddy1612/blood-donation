import React, { useState } from "react";
import axios from "axios";
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

  const validation = () => {
    let errors = {};
    if (recipient.Name.length > 30) {
      errors.Name = "NAME MUST BE LESS THAN 30 CHARACTERS!!";
    }
    if (!recipient.Email.includes("@")) {
      errors.Email = "Invalid Email Address!!";
    }
    if (recipient["Contact-Number"].length !== 10) {
      errors["Contact-Number"] = "PHONE NUMBER MUST BE 10 DIGITS";
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
        const response = await axios.post("http://localhost:3001/Recipients", {
          Name: recipient.Name,
          Age: recipient.Age,
          "Blood-type-needed": recipient["Blood-type-needed"],
         
          "Contact-details": {
            "Contact-Number": recipient["Contact-Number"],
            Email: recipient.Email
          },
          "Required-On": recipient["Required-On"]
        }, {
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
          <h1>Recipient Registration</h1>
          {/* <h2>Join our cause</h2> */}
          <h3> Save Lives By Receiving Blood</h3>
        </div>
        <div className="card">
          <div className="card-header">RECIPIENT REGISTRATION FORM :</div>
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
                  onChange={handleChange}
                />
                {errors.Age && <div className="invalid-feedback">{errors.Age}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Blood-type-needed">Blood Type Needed:</label>
                <input
                  type="text"
                  className={`form-control ${errors["Blood-type-needed"] ? "is-invalid" : ""}`}
                  id="Blood-type-needed"
                  name="Blood-type-needed"
                  placeholder="Enter blood type needed"
                  value={recipient["Blood-type-needed"]}
                  onChange={handleChange}
                />
                {errors["Blood-type-needed"] && <div className="invalid-feedback">{errors["Blood-type-needed"]}</div>}
              </div>

              

              <div className="form-group">
                <label htmlFor="Contact-Number">Contact Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors["Contact-Number"] ? "is-invalid" : ""}`}
                  id="Contact-Number"
                  name="Contact-Number"
                  placeholder="Enter contact number"
                  value={recipient["Contact-Number"]}
                  onChange={handleChange}
                />
                {errors["Contact-Number"] && <div className="invalid-feedback">{errors["Contact-Number"]}</div>}
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
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="Required-On">Required On:</label>
                <input
                  type="text"
                  className={`form-control ${errors["Required-On"] ? "is-invalid" : ""}`}
                  id="Required-On"
                  name="Required-On"
                  placeholder="Enter required date"
                  value={recipient["Required-On"]}
                  onChange={handleChange}
                />
                {errors["Required-On"] && <div className="invalid-feedback">{errors["Required-On"]}</div>}
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

export default RecipientsForm;
