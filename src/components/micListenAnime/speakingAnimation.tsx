import React from 'react';
import './speakingAnimation.css'; // Create this CSS file for styles


const SpeakingAnimation: React.FC = () => {
    return (
      <div className="speaking-container">
        <div className="speaking-bar"></div>
        <div className="speaking-bar"></div>
        <div className="speaking-bar"></div>
        <div className="speaking-bar"></div>
        <div className="speaking-bar"></div>
      </div>
    );
  };
export default SpeakingAnimation;
