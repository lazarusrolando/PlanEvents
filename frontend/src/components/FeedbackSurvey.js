import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './FeedbackSurvey.css';

const FeedbackSurvey = ({ onClose }) => {
  const questions = [
    'How satisfied are you with the event?',
    'How satisfied are you with the organization?',
    'How satisfied are you with the venue?',
    'How satisfied are you with the speakers?',
    'How satisfied are you with the overall experience?',
  ];

  const [responses, setResponses] = useState(
    Array(questions.length).fill(null)
  );
  const [comments, setComments] = useState('');

  const handleResponseChange = (index, value) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the responses
    console.log('Feedback submitted:', { responses, comments });
    toast.success('Thank you for your feedback!');
    // Reset form
    setResponses(Array(questions.length).fill(null));
    setComments('');
  };

  return (
    <div className="feedback-survey-container">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Feedback Survey</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="question-block">
            <p>{question}</p>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="Satisfied"
                checked={responses[index] === 'Satisfied'}
                onChange={() => handleResponseChange(index, 'Satisfied')}
                required
              />
              Satisfied
            </label>
            <label>
              <input
                type='radio'
                name={`question-${index}`}
                value="Neutral"
                checked={responses[index] === 'Neural'}
                onChange={() => handleResponseChange(index, 'Neural')} />
              Neural
            </label>
            <label>
              <input
                type="radio"
                name={`question-${index}`}
                value="Unsatisfied"
                checked={responses[index] === 'Unsatisfied'}
                onChange={() => handleResponseChange(index, 'Unsatisfied')}
              />
              Unsatisfied
            </label>
          </div>
        ))}
        <div className="comments-block">
          <label htmlFor="comments">Additional Comments:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Your comments here..."
          />
        </div>
        <button type="submit" className="submitbutton">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackSurvey;
