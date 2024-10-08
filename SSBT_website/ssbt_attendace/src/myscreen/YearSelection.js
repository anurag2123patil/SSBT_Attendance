import React from 'react';
import { useNavigate } from 'react-router-dom';
import './YearSelection.css';

function YearSelection() {
  const navigate = useNavigate();

  return (
    <div className="year-container">
      <div className="title">
        <h2>YEAR</h2>
      </div>
      <div className="year-buttons">
        <button className="year-button">FIRST YEAR</button>
        <button className="year-button" onClick={() => navigate('/computer/year1/sectionSE')}>SECOND YEAR</button>
        <button className="year-button" onClick={() => navigate('/computer/year1/sectionTE')}>THIRD YEAR</button>
        <button className="year-button" onClick={() => navigate('/computer/year1/sectionBE')}>FOURTH YEAR</button>
      </div>
    </div>
  );
}

export default YearSelection;
