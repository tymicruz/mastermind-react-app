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

/**
 * Generates a random code for the Mastermind game
 * @param hardMode - If true, allows repeated colors. If false, no repeated colors.
 * @returns An array of 4 random colors
 */
export function generateRandomCode(hardMode: boolean = false): Color[] {
  const colors = Object.values(Color);
  const code: Color[] = [];
  
  if (hardMode) {
    // Hard mode: allow repeated colors
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      code.push(colors[randomIndex]);
    }
  } else {
    // Normal mode: no repeated colors
    const availableColors = [...colors]; // Copy array to avoid mutating original
    
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      code.push(availableColors[randomIndex]);
      availableColors.splice(randomIndex, 1); // Remove used color
    }
  }
  
  return code;
}