// src/pages/TweetsPage.js
import React from 'react';
import TweetCard from '../components/TweetCard';  // Import the TweetCard component
import './TweetsPage.css';  // Import the CSS for styling
import Navbar from '../components/Navbar';

const TweetsPage = ({ tweets }) => {
  return (

    <div className="tweets-page">
      <h2>Generated Tweets</h2>
      <div className="tweets-grid">
        {tweets.map((tweetData, index) => (
          <TweetCard key={index} time={tweetData.time} tweet={tweetData.tweet} />
        ))}
      </div>
    </div>

  );
};

export default TweetsPage;
