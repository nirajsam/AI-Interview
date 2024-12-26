import React from 'react';
import './feedback.css';
interface FeedbackProps {
  feedBackData: String;
}

const Feedback: React.FC<FeedbackProps> = ({ feedBackData }) => {
  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="feedback">
      <h3 className="feedback__title">Feedback</h3>
      <div className="feedback__content">{feedBackData}</div>
      <button className="feedback__button" onClick={handleRestart}>
        Restart Interview
      </button>
    </div>
  );
};

export default Feedback;
