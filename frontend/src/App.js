import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import FormStep from './components/FormStep';
import ScheduleCard from './components/ScheduleCard';
import SummariesCard from './components/SummariesCard';
import TweetCard from './components/TweetCard';
import TypingAnimation from './components/TypingAnimation';
import GeneratingAnimation from './components/GeneratingAnimation';
import './App.css';
import './components/SharedCardStyles.css';

const App = () => {
  const [step, setStep] = useState(0);
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const [contentType, setContentType] = useState('');
  const [postFrequency, setPostFrequency] = useState('');
  const [keywords, setKeywords] = useState('');
  const [schedule, setSchedule] = useState('');
  const [postSummaries, setPostSummaries] = useState([]);
  const [fullPosts, setFullPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Full Posts:', fullPosts);
  }, [fullPosts]);

  const getFrequencyCount = (frequency) => {
    switch (frequency) {
      case 'Three Times a Week':
        return 3;
      case 'Weekly Once':
        return 1;
      case 'Biweekly':
        return 2;
      case 'Monthly':
        return 4; // Assuming 4 weeks in a month
      default:
        return 3; // Default to 3 if unknown
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setStep(5); // Immediately move to the next step to show animation
    
    try {
      const response = await axios.post('http://localhost:8000/schedule', {
        area_of_interest: areaOfInterest,
        content_type: contentType,
        post_frequency: postFrequency,
        keywords: keywords.split(',').map(k => k.trim()),
      });

      const { schedule, post_summaries, full_posts } = response.data;
      
      setSchedule(schedule);
      setPostSummaries(post_summaries);
      
      // Process full_posts
      if (typeof full_posts === 'string') {
        const processedPosts = full_posts.split(/(?=### Post)/).filter(post => post.trim() !== '');
        setFullPosts(processedPosts);
      } else if (Array.isArray(full_posts)) {
        setFullPosts(full_posts);
      } else {
        console.error('Unexpected full_posts format:', full_posts);
        setFullPosts([]);
      }

      setStep(6); // Move to the final step to display content
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating content. Please try again.');
      setStep(4); // Go back to the form if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormSteps = () => {
    return (
      <>
        <FormStep stepNumber={1} title="Area of Interest" isVisible={step >= 1}>
          <div className="options">
            {['Technology', 'Automotive', 'Music', 'Health', 'Fashion', 'Sports', 'Travel'].map((option) => (
              <div 
                key={option}
                className={`option ${areaOfInterest === option ? 'selected' : ''}`} 
                onClick={() => { setAreaOfInterest(option); setStep(2); }}
              >
                {option}
              </div>
            ))}
          </div>
        </FormStep>

        <FormStep stepNumber={2} title="Type of Content" isVisible={step >= 2}>
          <div className="options">
            {['Educational', 'Updates', 'Formal', 'Informal', 'Tutorial', 'Announcements'].map((option) => (
              <div 
                key={option}
                className={`option ${contentType === option ? 'selected' : ''}`} 
                onClick={() => { setContentType(option); setStep(3); }}
              >
                {option}
              </div>
            ))}
          </div>
        </FormStep>

        <FormStep stepNumber={3} title="Frequency" isVisible={step >= 3}>
          <div className="options">
            {['Three Times a Week', 'Weekly Once', 'Monthly', 'Biweekly'].map((option) => (
              <div 
                key={option}
                className={`option ${postFrequency === option ? 'selected' : ''}`} 
                onClick={() => { setPostFrequency(option); setStep(4); }}
              >
                {option}
              </div>
            ))}
          </div>
        </FormStep>

        <FormStep stepNumber={4} title="Enter Keywords" isVisible={step >= 4}>
          <div className="keyword-input">
            <input 
              type="text" 
              value={keywords} 
              onChange={(e) => setKeywords(e.target.value)} 
              placeholder="Enter keywords separated by commas" 
            />
            <button 
              className="generate-button" 
              onClick={handleSubmit}
              disabled={isLoading || !keywords.trim()}
            >
              {isLoading ? 'Generating...' : 'Generate Content'}
            </button>
          </div>
        </FormStep>
      </>
    );
  };

  const renderContent = () => {
    if (step < 5) return renderFormSteps();

    if (step === 5 || isLoading) {
      return <GeneratingAnimation />;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    console.log('Rendering content, fullPosts:', fullPosts);

    return (
      <div className="card generated-content">
        <div className="info-row">
          <ScheduleCard schedule={schedule} />
          <SummariesCard summaries={postSummaries} />
        </div>
        <div className="tweets-grid">
          {fullPosts.map((post, index) => (
            <TweetCard key={index} post={post} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <Navbar userName="User" />
      <div className="content">
        {step === 0 ? (
          <TypingAnimation userName="User" onBegin={() => setStep(1)} />
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default App;


