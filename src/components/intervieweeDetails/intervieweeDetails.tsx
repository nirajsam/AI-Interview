import React, { useState } from 'react';
import useQAStore from '@/statemaagement/quesAnsDataSore';
import './intervieweeDetails.css';

const StartPage: React.FC = () => {
  const { setIntervieweeDetails } = useQAStore();
  const [name, setName] = useState('');
  const [technology, setTechnology] = useState('');
  const [experience, setExperience] = useState('');
  const [time, setTime] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    if(!name || !technology || !experience || !time || !token){
      alert('Please enter all the details');
      return
    }
    setIntervieweeDetails({name, technology, experience, time, token});
    alert('Details submitted successfully!');
  };

  return (
    <div className="start-page">
      <h3 className="start-detail-page__title">Hi Interviewee, Please enter your details</h3>
      <input
        type="text"
        className="start-page__input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        
      />
      <input
        type="text"
        className="start-page__input"
        placeholder="Technology"
        value={technology}
        onChange={(e) => setTechnology(e.target.value)}
      />
      <input
        type="text"
        className="start-page__input"
        placeholder="Years of experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />
      <input
        type="text"
        className="start-page__input"
        placeholder="number of questions you want to ans"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        autoComplete="new-time"
      />
      <input
        type="password"
        className="start-page__input"
        placeholder="provide gemini token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        autoComplete="new-password"
      />
      <button className="start-page__submit-button" onClick={handleSubmit}>
        Submit your details
      </button>
    </div>
  );
};

export default StartPage;
