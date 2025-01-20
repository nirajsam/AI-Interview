import React, { useState, useEffect } from 'react';

const FeedbackComponent = ({feedbackText}: any) => {

  const containerStyle = {
    padding: '20px',
    margin: '10px auto',
    maxWidth: '800px',
    backgroundColor: '#f8f9fa',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const textStyle = {
    fontSize: '10px',
    lineHeight: '1.6',
    marginBottom: '10px',
  };

  const overallScoreStyle = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#d9534f',
    marginTop: '20px',
  };

  const formatFeedback = (feedbackText: string) => {
    console.log("sam",feedbackText)
    const sections = feedbackText.split('**');
    return sections.map((section, index) => {
      if (section.startsWith('Feedback by Question:')) {
        return <div key={index} style={headerStyle}>{section}</div>;
      } else if (section.startsWith('Question')) {
        return <p key={index} style={textStyle}><strong>{section}</strong></p>;
      } else if (section.startsWith('Overall Score')) {
        return <div key={index} style={overallScoreStyle}>{section}</div>;
      }
      return <p key={index} style={textStyle}>{section}</p>;
    });
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Interview Response Feedback</div>
      {feedbackText ? formatFeedback(feedbackText) : <p style={textStyle}>Loading feedback...</p>}
    </div>
  );
};

export default FeedbackComponent;
