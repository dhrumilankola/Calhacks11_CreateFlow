import React from 'react';

const Step1 = ({ selectedOption, handleOptionSelect }) => (
  <div>
    <h2>Step 1: Area of Interest</h2>
    <div className="options">
      <div 
        className={`option ${selectedOption === 'Technology' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Technology')}
      >
        Technology
      </div>
      <div 
        className={`option ${selectedOption === 'Automotive' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Automotive')}
      >
        Automotive
      </div>
      <div 
        className={`option ${selectedOption === 'Music' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Music')}
      >
        Music
      </div>
      <div 
        className={`option ${selectedOption === 'Health' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Health')}
      >
        Health
      </div>
      <div 
        className={`option ${selectedOption === 'Fashion' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Fashion')}
      >
        Fashion
      </div>
      <div 
        className={`option ${selectedOption === 'Sports' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Sports')}
      >
        Sports
      </div>
      <div 
        className={`option ${selectedOption === 'Travel' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Travel')}
      >
        Travel
      </div>
    </div>
  </div>
);

export default Step1;
