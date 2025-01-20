import React from 'react';
import './feedback.css';
import FeedbackComponent from './feedbackFormat';
import ErrorBoundary from '../errorBoundry/errorBoundry';
interface FeedbackProps {
  feedBackData: String;
}

const Feedback: React.FC<FeedbackProps> = ({ feedBackData }) => {
  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="feedback">
      
      <div className="feedback__content"><ErrorBoundary fallback={<div><h3 className="feedback__title">Feedback</h3><div>{feedBackData}</div></div>}><FeedbackComponent feedbackText={feedBackData} /></ErrorBoundary></div>
      <button className="feedback__button" onClick={handleRestart}>
        Restart Interview
      </button>
    </div>
  );
};

export default Feedback;
