import React from 'react';

const Step4 = ({ keywords, handleKeywordChange }) => (
  <div>
    <h2>Step 4: Enter Keywords</h2>
    <div className="keyword-input">
      <input 
        type="text" 
        value={keywords} 
        onChange={(e) => handleKeywordChange(e.target.value)} 
        placeholder="Enter keywords separated by commas" 
      />
    </div>
  </div>
);

export default Step4;
