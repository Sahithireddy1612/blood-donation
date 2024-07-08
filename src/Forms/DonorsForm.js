import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import SubmitButton from "../components/projectsubmit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

  const handleAgeChange = (event) => {
    const { value } = event.target;
    if (value.length <= 2) {
      setDonor({ ...donor, Age: value });
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const fileRef = ref(storage, file.name);
    await uploadBytes(fileRef, file);
    const imageUrl = await getDownloadURL(fileRef);
    setDonor({ ...donor, "image-url": imageUrl });
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

    const lastDonatedDate = new Date(donor["last-donated"]);
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    if (lastDonatedDate > oneMonthAgo) {
      errors["last-donated"] = "You are not eligible to donate. Last donation must be more than one month ago.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validation();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setRegistrationMessage("REGISTRATION FAILED: Check eligibility criteria.");
    } else {
      setErrors({});
      try {
        await addDoc(collection(db, "donors"), donor);
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
                  value={donor.Age}
                  onChange={handleAgeChange}
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
                  value={donor["Blood-type"]}
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
                <label htmlFor="Contact-Number">Contact Number:</label>
                <input
                  type="tel"
                  className={`form-control ${errors.ContactNumber ? "is-invalid" : ""}`}
                  id="Contact-Number"
                  name="Contact-Number"
                  placeholder="Enter contact number"
                  value={donor["Contact-details"]["Contact-Number"]}
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
                  value={donor["Contact-details"].Email}
                  onChange={handleChange}
                  required
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="last-donated">Last Donated (MM/DD/YYYY):</label>
                <input
                  type="date"
                  className={`form-control ${errors["last-donated"] ? "is-invalid" : ""}`}
                  id="last-donated"
                  name="last-donated"
                  value={donor["last-donated"]}
                  onChange={handleChange}
                  required
                />
                {errors["last-donated"] && <div className="invalid-feedback">{errors["last-donated"]}</div>}
              </div>

              {registrationMessage && (
                <div className={`alert ${registrationMessage.includes("SUCCESSFUL") ? "alert-success" : "alert-danger"}`}>
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

export default BloodDonorForm;
