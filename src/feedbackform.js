import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [message, setMessage] = useState('');


  const SubmitFeedback = async () => {
    const feedbackBody = {
      name: name,
      email: email,
      suggestion: suggestion,
    };
    try {
      const response = await axios.post(
        'http://localhost:3002/api/feedback',
        feedbackBody
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSuggestionChange = (e) => {
    setSuggestion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data (e.g., send it to the server)
    SubmitFeedback();
  };

  return (
    <>
      <div className='navbar'>
        <div className='main-heading'>CoffeeMate Suggestions</div>
      </div>
      <div className='main'>
        {message ? (
          <div className='message'>{message}</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='child'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className='child'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className='child'>
              <label htmlFor='suggestion'>Suggest:</label>
              <textarea
                id='suggestion'
                value={suggestion}
                onChange={handleSuggestionChange}
                required
              />
            </div>
            <div className='child'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default FeedbackForm;