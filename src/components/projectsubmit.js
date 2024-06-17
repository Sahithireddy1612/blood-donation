import React from 'react';
import './submitbutton.css';

const SubmitButton = ({ handleSubmit }) => {
  return (
    <div>
      <button className="donate-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitButton;
