import React, { useState } from 'react';
import axios from 'axios';

const BugForm = ({ onBugAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bugs', {
        title,
        description
      });
      onBugAdded(response.data);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      console.error('BugForm error:', err); // Debugging log
      setError(err.response?.data?.message || 'Failed to create bug');
    }
  };

  return (
    <div>
      <h2>Report a Bug</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bug Title"
          data-testid="title-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Bug Description"
          data-testid="description-input"
        />
        <button type="submit" data-testid="submit-button">Submit Bug</button>
      </form>
    </div>
  );
};

export default BugForm;