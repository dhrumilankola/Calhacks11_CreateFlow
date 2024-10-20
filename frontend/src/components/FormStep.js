import React from 'react';
import './FormStep.css';

const FormStep = ({ stepNumber, title, children, isVisible }) => {
  return (
    <div className={`form-step ${isVisible ? 'visible' : ''}`}>
      <h2>Step {stepNumber}: {title}</h2>
      {children}
    </div>
  );
};

export default FormStep;