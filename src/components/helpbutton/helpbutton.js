import React from 'react';
import { useNavigate } from 'react-router-dom';
import './helpbutton.css';

const HelpButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/ReciepentsForm'); 
  };

  return (
    <div>
      <button className="help-button" onClick={handleButtonClick}>Help</button>
    </div>
  );
};

export default HelpButton;
