import React from "react";

export interface FeedbackItem {
  correct: number;
  misplaced: number;
}

interface FeedbackProps {
  feedback: FeedbackItem[];
}

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  return (
    <div>
      {feedback.map((item, i) => (
        <div key={i}>
          {item.correct} correct, {item.misplaced} misplaced
        </div>
      ))}
    </div>
  );
};

export default Feedback;
