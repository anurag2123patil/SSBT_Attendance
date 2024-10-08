import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubjectSelectionTEA.css';

function SubjectSelectionTEA() {
    const navigate = useNavigate();

    return (
        <div className="subject-container">
            <div className="title">
                <h2>SUBJECT A</h2>
            </div>
            <div className="subject-grid">
                <button className="subject-button" onClick={() => {
                    navigate('/computer/year1/sectionTE/TEA/SoftWareA')
                }}>SOFTWARE ENGINEERING</button>
                <button className="subject-button" onClick={() => {
                    navigate('/computer/year1/sectionTE/TEA/DBMSA')
                }}>DATABASE MANAGEMENT SYSTEM</button>
                <button className="subject-button" onClick={() => {
                    navigate('/computer/year1/sectionTE/TEA/FLATA')
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

export default SubjectSelectionTEA;
