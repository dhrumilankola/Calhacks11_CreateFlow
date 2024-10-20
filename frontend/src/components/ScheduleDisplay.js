import React from 'react';
import ReactMarkdown from 'react-markdown';
import './SharedCardStyles.css';

const ScheduleDisplay = ({ postFrequency, schedule, postSummaries }) => {
  return (
    <div className="schedule-display">
      <h1 className="main-title">Your Upcoming Posts Schedule</h1>
      <div className="schedule-card">
        <ReactMarkdown>{schedule}</ReactMarkdown>
      </div>
      
      <div className="summaries-card">
        <ReactMarkdown>{postSummaries}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ScheduleDisplay;