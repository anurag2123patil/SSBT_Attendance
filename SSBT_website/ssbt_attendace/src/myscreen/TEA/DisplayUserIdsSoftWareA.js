import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DisplayUserIdsSoftWareA.css'; // Import the CSS file

const DisplayUserIdsSoftWareA = () => {
  const [userCount, setUserCount] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserCount = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('Fetching User count from SoftWareA');
      const response = await axios.get('http://localhost:3000/softwarea/get-user-count');
      console.log('Response received:', response.data);
      setUserCount(response.data.count);
    } catch (error) {
      console.error('Error fetching User count:', error);
      setError('Failed to fetch User count');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  return (
    <div className="user-ids-container">
      <div className="title">
        <h1>Total User IDs in SoftWare</h1>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {userCount !== null && !loading && (
        <p className="user-count">Total User IDs: {userCount}</p>
      )}
    </div>
  );
};

export default DisplayUserIdsSoftWareA;
