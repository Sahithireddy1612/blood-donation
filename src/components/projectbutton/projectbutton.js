import React from 'react';
import { useNavigate } from 'react-router-dom';
import './projectbutton.css';

const DonateButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/donors-form'); 
  };

  return (
    <div>
      <button className="donate-button" onClick={handleButtonClick}>Donate</button>
    </div>
  );
};

export default DonateButton;
