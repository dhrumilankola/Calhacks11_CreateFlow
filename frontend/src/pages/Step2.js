import React from 'react';

const Step2 = ({ selectedOption, handleOptionSelect }) => (
  <div>
    <h2>Step 2: Type of Content</h2>
    <div className="options">
      <div 
        className={`option ${selectedOption === 'Educational' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Educational')}
      >
        Educational
      </div>
      <div 
        className={`option ${selectedOption === 'Updates' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Updates')}
      >
        Updates
      </div>
      <div 
        className={`option ${selectedOption === 'Formal' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Formal')}
      >
        Formal
      </div>
      <div 
        className={`option ${selectedOption === 'Informal' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Informal')}
      >
        Informal
      </div>
      <div 
        className={`option ${selectedOption === 'Tutorial' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Tutorial')}
      >
        Tutorial
      </div>
      <div 
        className={`option ${selectedOption === 'Announcements' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Announcements')}
      >
        Announcements
      </div>
    </div>
  </div>
);

export default Step2;
