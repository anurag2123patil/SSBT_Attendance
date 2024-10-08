import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SectionSelection.css';

function SectionSelection() {
  const navigate = useNavigate();

  return (
    <div className="section-container">
      <div className="title">
        <h2>SECTION</h2>
      </div>
      <div className="section-buttons">
        <button className="section-button" onClick={() => navigate('/computer/year1/sectionTE/TEA')}>A SECTION</button>
        <button className="section-button" onClick={() => navigate('/computer/year1/sectionTE/TEB')}>B SECTION</button>
        <button className="section-button" onClick={() => navigate('/computer/year1/sectionTE/TEC')}>C SECTION</button>
      </div>
    </div>
  );
}

export default SectionSelection;
