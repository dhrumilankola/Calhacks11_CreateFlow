import React, { useState, useEffect } from 'react';
import './GeneratingAnimation.css';

const agents = [
  "Scheduling Agent",
  "Content Generating Agent",
  "Summarization Agent",
  "Optimization Agent",
  "Trending Topics Agent",
  "Post Analysis Agent"
];

const GeneratingAnimation = () => {
  const [completedAgents, setCompletedAgents] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedAgents(prev => {
        if (prev.length === agents.length) return prev;
        return [...prev, agents[prev.length]];
      });
    }, 1000); // Complete an agent every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="generating-animation">
      <h2>Generating Content</h2>
      <ul className="agent-list">
        {agents.map((agent, index) => (
          <li key={index} className={completedAgents.includes(agent) ? 'completed' : ''}>
            {completedAgents.includes(agent) ? '✅' : '⏳'} {agent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneratingAnimation;