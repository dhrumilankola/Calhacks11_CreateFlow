import React from 'react';
import ReactMarkdown from 'react-markdown';
import './SharedCardStyles.css';

const TweetCard = ({ post }) => {
  return (
    <div className="card tweet-card">
      <ReactMarkdown>{post}</ReactMarkdown>
    </div>
  );
};

export default TweetCard;