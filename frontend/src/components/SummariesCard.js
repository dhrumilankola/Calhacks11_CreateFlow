import React from 'react';
import ReactMarkdown from 'react-markdown';
import './SharedCardStyles.css';

const SummariesCard = ({ summaries }) => {
  const renderSummaries = () => {
    if (typeof summaries === 'string') {
      return <ReactMarkdown>{summaries}</ReactMarkdown>;
    } else if (Array.isArray(summaries)) {
      return summaries.map((summary, index) => (
        <ReactMarkdown key={index}>{summary}</ReactMarkdown>
      ));
    } else {
      return <p>Unable to display summaries. Invalid data format.</p>;
    }
  };

  return (
    <div className="summaries-card card">
      <h2>Post Summaries</h2>
      {renderSummaries()}
    </div>
  );
};

export default SummariesCard;