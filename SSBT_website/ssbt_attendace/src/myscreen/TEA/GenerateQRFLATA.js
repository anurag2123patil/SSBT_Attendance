import React, { useState } from 'react';
import axios from 'axios';
import DisplayUserIdsFLATA from './DisplayUserIdsFLATA';
import './GenerateQRFLATA.css'; // Import the CSS file

const GenerateQRFLATA = () => {
  const [qrImage, setQrImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [qrVisible, setQrVisible] = useState(true);
  const [limit, setLimit] = useState('');
  const [limitError, setLimitError] = useState('');

  const generateQRCode = async () => {
    setLoading(true);
    setError(null);
    setQrImage(null);

    try {
      const response = await axios.get('http://localhost:3000/flatb/generate-qr');
      setQrImage(response.data.qrImage);

      // Set QR code visibility to true
      setQrVisible(true);

      // Hide QR code after 10 seconds
      setTimeout(() => {
        setQrVisible(false);
      }, 10000);
    } catch (error) {
      setError('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };


  // const exportAttendance = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/flata/export-attendance', {
  //       responseType: 'blob',
  //     });
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'FLATA_Attendance.xlsx');
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Failed to export attendance:', error);
  //   }
  // };



  const exportAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:3000/flata/export-attendance', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'FLATA_Attendance.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError('Failed to export attendance');
    }
  };

  const clearAttendance = async () => {
    try {
      await axios.delete('http://localhost:3000/clear-attendance/FLATA');
      alert('All attendance records cleared for FLAT-A');
    } catch (error) {
      console.error('Failed to clear attendance:', error);
    }
  };

  const handleSetLimit = async () => {
    try {
      await axios.post('http://localhost:3000/set-limit', {
        subject: 'FLATA',
        limit: parseInt(limit, 10),
      });
      alert('Limit set successfully');
    } catch (error) {
      setLimitError('Failed to set limit');
    }
  };

  // const handleClearExcel = async () => {
  //   try {
  //     const response = await axios.delete('http://localhost:3000/clear-all-excel');
  //     alert(response.data);
  //   } catch (error) {
  //     console.error('Error clearing Excel files:', error);
  //     alert('Error clearing Excel files');
  //   }
  // };

  return (
    <div className="qr-container">
      <div className="title">
        <h1>Generate QR Code for FLAT</h1>
      </div>

      <button className="generate-button" onClick={generateQRCode}>Generate QR Code</button>


      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {qrVisible && qrImage && <img className="qr-image" src={qrImage} alt="Generated QR Code" />}
      <button className="export-button" onClick={exportAttendance}>Export Attendance</button>
      <div>
        <button className="clear-button2" onClick={clearAttendance}>Clear Attendance</button>
      </div>
      <div className="limit-container">
        <h3>Set Student Limit</h3>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Enter limit"
        />
        <button onClick={handleSetLimit}>Set Limit</button>
        {limitError && <p className="error-text">{limitError}</p>}
        <DisplayUserIdsFLATA />
      </div>
    </div>
  );
};

export default GenerateQRFLATA;

