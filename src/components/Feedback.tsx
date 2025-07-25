import React from "react";

export interface FeedbackItem {
  correct: number;
  misplaced: number;
}

interface FeedbackProps {
  feedback: FeedbackItem;
}

const Feedback: React.FC<FeedbackProps> = ({ feedback }) => {
  const totalPegs = 4;
  const correctPegs = feedback.correct;
  const misplacedPegs = feedback.misplaced;
  const emptyPegs = totalPegs - correctPegs - misplacedPegs;

  const allPegs = [
    ...Array(correctPegs).fill("correct"),
    ...Array(misplacedPegs).fill("misplaced"),
    ...Array(emptyPegs).fill("empty"),
  ];

  return (
    <div className="feedback-pegs">
      {allPegs.map((type, i) => (
        <div key={i} className={`feedback-peg ${type}`} />
      ))}
    </div>
  );
};

export default Feedback;
