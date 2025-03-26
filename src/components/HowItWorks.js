import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <div className="how-it-works">
      <h2>How to Play Wordle</h2>
      <p>Guess the secret word in 6 attempts! Each guess must be a valid 5-letter word.</p>
      
      <div className="steps">
        <div className="step">
          <span className="step-number">1</span>
          <p>Type in a 5-letter word and press "Enter" to submit.</p>
        </div>
        <div className="step">
          <span className="step-number">2</span>
          <p>Letters will change colors to give you hints:</p>
          <ul>
            <li><span className="green-box"></span> Correct letter in the correct spot.</li>
            <li><span className="yellow-box"></span> Correct letter in the wrong spot.</li>
            <li><span className="gray-box"></span> Letter is not in the word.</li>
          </ul>
        </div>
        <div className="step">
          <span className="step-number">3</span>
          <p>Keep guessing until you find the secret word or run out of attempts!</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
