import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectSelectionTEB.css';

function SubjectSelectionTEB() {
    const navigate = useNavigate();

    return (
        <div className="subject-container">
            <div className="title">
                <h2>SUBJECT B</h2>
            </div>
            <div className="subject-grid">
                <button className="subject-button" onClick={() => {
                    navigate('/computer/year1/sectionTE/TEB/SoftWareB')
                }}>SOFTWARE ENGINEERING</button>
                <button className="subject-button" onClick={() => {
                    navigate('/computer/year1/sectionTE/TEB/DBMSB')
                }}>DATABASE MANAGEMENT SYSTEM</button>
                <button className="subject-button" onClick={() => {
                    navigate('/computer/year1/sectionTE/TEB/FLATB')
                }}>FORMAL LANGUAGE AND AUTOMETA TH</button>
                <button className="subject-button">ARTIFICIAL INTELLIGENCE</button>
                <button className="subject-button">CYBER LAW AND ETHICS</button>
                <button className="subject-button">SOFTWARE ENGINEERING LAB</button>
                <button className="subject-button">DATABASE MANAGEMENT SYST. LAB</button>
                <button className="subject-button">WEB PROGRAMMING LANG LAB</button>
            </div>
        </div>
    );
}

export default SubjectSelectionTEB;
