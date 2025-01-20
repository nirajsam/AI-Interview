import React from 'react';
import './listeningAnimation.css'; // Ensure this CSS file exists

const ListeningAnimation: React.FC = () => {
  return (
    <div className="listening-container">
      <div className="listening-circle"></div>
      <div className="listening-circle"></div>
      <div className="listening-circle"></div>
    </div>
  );
};

export default ListeningAnimation;
