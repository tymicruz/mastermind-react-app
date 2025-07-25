// Mastermind game logic will be implemented here 
export enum Color {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow",
  Purple = "purple",
  Orange = "orange",
} 

export const EMPTY_GUESS: (Color | null)[] = [null, null, null, null];

export const EMPTY_GUESSES = Array(10).fill(null);

export const EMPTY_FEEDBACKS = Array(10).fill({ correct: 0, misplaced: 0 });