import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DepartmentSelection.css';

function DepartmentSelection() {
  const navigate = useNavigate();
  return (
    <div className="department-container">
      <header className="header">
      </header>
      <div className="title">
        <h2>DEPARTMENT</h2>
      </div>
      <div className="department-buttons">
        <button className="department-button" onClick={() => navigate('/computer/year1')}>COMPUTER</button>
        <button className="department-button" onClick={() => navigate('/mechenical/year2')}>MECHANICAL</button>
        <button className="department-button" onClick={() => navigate('/electrical/year3')}>ELECTRICAL</button>
        <button className="department-button" onClick={() => navigate('/etc/year4')}>E & TC</button>
        <button className="department-button" onClick={() => navigate('/civil/year5')}>CIVIL</button>
      </div>
    </div>
  );
}

export default DepartmentSelection;
