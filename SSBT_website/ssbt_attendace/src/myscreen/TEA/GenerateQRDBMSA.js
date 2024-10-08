// import React, { useState } from 'react';
// import axios from 'axios';
// import DisplayUserIdsDBMSA from './DisplayUserIdsDBMSA';
// import './GenerateQRDBMSA.css';

// const GenerateQRDBMSA = () => {
//   // const [formData, setFormData] = useState({
//   //   prn: '',
//   //   password: '',
//   //   mobile: '',
//   //   branch: '',
//   //   year: '',
//   //   section: '',
//   // });
//   const [qrImage, setQrImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [qrVisible, setQrVisible] = useState(true);
//   const [limit, setLimit] = useState('');
//   const [limitError, setLimitError] = useState('');
//   const [items, setItems] = useState([]);
//   const generateQRCode = async () => {
//     setLoading(true);
//     setError(null);
//     setQrImage(null);

//     try {
//       const response = await axios.get('http://localhost:3000/dbmsa/generate-qr');
//       setQrImage(response.data.qrImage);
//       setQrVisible(true);

//       setTimeout(() => {
//         setQrVisible(false);
//       }, 10000);
//     } catch (error) {
//       setError('Failed to generate QR code');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exportAttendance = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/dbmsa/export-attendance', {
//         responseType: 'blob',
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'DBMSA_Attendance.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (error) {
//       setError('Failed to export attendance');
//     }
//   };


//   const clearAttendance = async () => {
//     try {
//       await axios.delete('http://localhost:3000/clear-attendance/DBMSA');
//       alert('All attendance records cleared for DBMS-A');
//     } catch (error) {
//       console.error('Failed to clear attendance:', error);
//     }
//   };

//   const handleSetLimit = async () => {
//     try {
//       await axios.post('http://localhost:3000/set-limit', {
//         subject: 'DBMSA',
//         limit: parseInt(limit, 10),

//       });
//       // fetchAllRegisteredPRNs();
//       alert('Limit set successfully');
//     } catch (error) {
//       setLimitError('Failed to set limit');
//     }
//   };

//   // const fetchAllRegisteredPRNs = async () => {
//   //   try {
//   //     const response = await axios.get('http://localhost:5002/students').then(response => { setItems(response.data)});
//   //     console.log(response.data);
//   //   } catch (error) {
//   //     console.error(`Error fetching registered PRNs: ${error.message}`);
//   //     throw new Error(`Error fetching registered PRNs: ${error.message}`);
//   //   }
//   // };

//   const clearAll = async () => {
//     try {
//       await axios.delete('http://localhost:3000/clear-all');
//       alert('All records and files cleared');
//     } catch (error) {
//       alert('Error clearing all records and files');
//     }
//   };

//   return (
//     <div className="qr-container">
//       <div className="title">
//         <h2>Generate QR Code for DBMS</h2>
//       </div>

//       <button className="generate-button" onClick={generateQRCode}>Generate QR Code</button>

//       {loading && <p className="loading-text">Loading...</p>}
//       {error && <p className="error-text">{error}</p>}
//       {qrVisible && qrImage && <img className="qr-image" src={qrImage} alt="Generated QR Code" />}
//       <button className="export-button" onClick={exportAttendance}>Export Attendance</button>
//       <div>
//         <button className="clear-button2" onClick={clearAttendance}>Clear Attendance</button>
//         <button className="clear-button2" onClick={clearAll}>Clear Excel</button>
//       </div>

//       <div className="limit-container">
//         <h3>Set Student Limit</h3>
//         <input
//           type="number"
//           value={limit}
//           onChange={(e) => setLimit(e.target.value)}
//           placeholder="Enter limit"
//         />
//         <button onClick={handleSetLimit}>Set Limit</button>
//         {limitError && <p className="error-text">{limitError}</p>}
//         <DisplayUserIdsDBMSA />
//       </div>

//     </div>
//   );
// };

// export default GenerateQRDBMSA;









import React, { useState } from 'react';
import axios from 'axios';
import DisplayUserIdsDBMSA from './DisplayUserIdsDBMSA';
import './GenerateQRDBMSA.css';

const GenerateQRDBMSA = () => {
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
      const response = await axios.get('http://localhost:3000/dbmsa/generate-qr');
      setQrImage(response.data.qrImage);
      setQrVisible(true);

      setTimeout(() => {
        setQrVisible(false);
      }, 10000);
    } catch (error) {
      setError('Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const exportAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dbmsa/export-attendance', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'DBMSA_Attendance.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setError('Failed to export attendance');
    }
  };

  const clearAttendance = async () => {
    try {
      await axios.delete('http://localhost:3000/clear-attendance/DBMSA');
      alert('All attendance records cleared for DBMS-A');
    } catch (error) {
      console.error('Failed to clear attendance:', error);
    }
  };


  // const handleClearExcel = async () => {
  //   try {
  //     const response = await axios.delete('http://localhost:3000/clear-all');
  //     alert(response.data);
  //   } catch (error) {
  //     console.error('Error clearing Excel files:', error);
  //     alert('Error clearing Excel files');
  //   }
  // };

  const handleSetLimit = async () => {
    try {
      await axios.post('http://localhost:3000/set-limit', {
        subject: 'DBMSA',
        limit: parseInt(limit, 10),
      });
      alert('Limit set successfully');
    } catch (error) {
      setLimitError('Failed to set limit');
    }
  };

  // const fetchPrnList = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5002/prns?section=A'); // Adjust section as needed
  //     setPrnList(response.data);
  //     // console.log(response.data);
  //   } catch (error) {
  //     setError('Failed to fetch PRN list');
  //   }
  // };

  return (
    <div className="qr-container">
      <div className="title">
        <h2>Generate QR Code for DBMS</h2>
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
        <DisplayUserIdsDBMSA />
      </div>

      {/* <div className="prn-container">
        <h3>Export PRN List</h3>
        <button onClick={fetchPrnList}>Export PRN</button>
        {prnList.length > 0 && (
          <ul>
            {prnList.map((prn, index) => (
              <li key={index}>{prn.prn}</li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default GenerateQRDBMSA;
