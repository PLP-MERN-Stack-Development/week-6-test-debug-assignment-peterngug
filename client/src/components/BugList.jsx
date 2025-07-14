import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BugList = () => {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bugs');
        setBugs(response.data);
      } catch (err) {
        console.error('BugList error:', err); // Debugging log
        setError('Failed to fetch bugs');
      }
    };
    fetchBugs();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/bugs/${id}`, { status });
      setBugs(bugs.map(bug => bug._id === id ? response.data : bug));
    } catch (err) {
      console.error('Status change error:', err);
      setError('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bugs/${id}`);
      setBugs(bugs.filter(bug => bug._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete bug');
    }
  };

  return (
    <div>
      <h2>Bug List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul data-testid="bug-list">
        {bugs.map(bug => (
          <li key={bug._id}>
            <h3>{bug.title}</h3>
            <p>{bug.description}</p>
            <select 
              value={bug.status} 
              onChange={(e) => handleStatusChange(bug._id, e.target.value)}
              data-testid={`status-select-${bug._id}`}
            >
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
            <button 
              onClick={() => handleDelete(bug._id)}
              data-testid={`delete-button-${bug._id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;