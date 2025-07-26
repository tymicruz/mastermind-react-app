import React from "react";

interface HowToPlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>How to Play</h2>

        <div className="how-to-play-content">
          <div className="section">
            <h3>🎯 Goal</h3>
            <p>Crack the secret 4-color code in 10 guesses or less!</p>
          </div>

          <div className="section">
            <h3>🎨 How to Play</h3>
            <ol>
              <li>Click color options to select them</li>
              <li>Click pegs in your guess row to place colors</li>
              <li>Submit when you have 4 colors</li>
              <li>Check feedback to see how close you are</li>
            </ol>
          </div>

          <div className="section">
            <h3>🔍 Feedback</h3>
            <div className="feedback-examples">
              <div className="feedback-item">
                <div className="peg-example black"></div>
                <span>Black = right color, right spot</span>
              </div>
              <div className="feedback-item">
                <div className="peg-example white"></div>
                <span>White = right color, wrong spot</span>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginTop: "10px" }}>
              The order of feedback pegs does not match your guess order.
            </p>
          </div>

          <div className="section">
            <h3>🎮 Modes</h3>
            <div className="mode-info">
              <div className="mode-item">
                <strong>Normal:</strong> Code can only use each color once
              </div>
              <div className="mode-item">
                <strong>Hard:</strong> Code can have repeated colors
              </div>
            </div>
          </div>
        </div>

        <button className="modal-button" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default HowToPlay;
