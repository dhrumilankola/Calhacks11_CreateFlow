import React from 'react';
import ReactMarkdown from 'react-markdown';
import './SharedCardStyles.css';

const ScheduleCard = ({ schedule }) => {
  return (
    <div className="card schedule-card">
      <h2>Posting Schedule</h2>
      <ReactMarkdown>{schedule}</ReactMarkdown>
    </div>
  );
};

export default ScheduleCard;