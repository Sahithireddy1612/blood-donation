import React from 'react';
import { useNavigate } from 'react-router-dom';
import './volunteerarrow.css';

const VolunteersArrow = () => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/VolunteersForm');
  };

  return (
    <div className="volunteer-cta">
      <div className="arrow-circle" onClick={handleArrowClick}>
        <span className="arrow" onClick={handleArrowClick}>&rarr;</span>
      </div>
      <span className="join-volunteer-text">Join Volunteer</span>
    </div>
  );
};

export default VolunteersArrow;
