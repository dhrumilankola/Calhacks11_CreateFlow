import React from 'react';

const Step3 = ({ selectedOption, handleOptionSelect }) => (
  <div>
    <h2>Step 3: Frequency</h2>
    <div className="options">
      <div 
        className={`option ${selectedOption === 'Three Times a Week' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Three Times a Week')}
      >
        Three Times a Week
      </div>
      <div 
        className={`option ${selectedOption === 'Weekly Once' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Weekly Once')}
      >
        Weekly Once
      </div>
      <div 
        className={`option ${selectedOption === 'Monthly' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Monthly')}
      >
        Monthly
      </div>
      <div 
        className={`option ${selectedOption === 'Biweekly' ? 'selected' : ''}`} 
        onClick={() => handleOptionSelect('Biweekly')}
      >
        Biweekly
      </div>
    </div>
  </div>
);

export default Step3;
