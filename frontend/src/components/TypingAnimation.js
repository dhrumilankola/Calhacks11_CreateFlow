import React, { useState, useEffect } from 'react';
import './TypingAnimation.css';

const TypingAnimation = ({ userName, onBegin }) => {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const message = `Hi ${userName}, What would you like to post today?`;
  const typingSpeed = 100; // Adjust typing speed

  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index < message.length) {
        setText((prev) => prev + message.charAt(index));
        index++;
        setTimeout(type, typingSpeed);
      } else {
        setIsTypingComplete(true); // Typing is complete
      }
    };
    type();
  }, [message]);

  return (
    <div className="typing-animation-container">
      <h1>{text}</h1>
      {isTypingComplete && (
        <button className="begin-button" onClick={onBegin}>
          Begin
        </button>
      )}
    </div>
  );
};

export default TypingAnimation;
