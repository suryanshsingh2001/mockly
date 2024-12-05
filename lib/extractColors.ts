// extractColors.ts
import {extractColors} from 'extract-colors';

/**
 * Shuffle an array in place using the Fisher-Yates algorithm.
 * @param array - The array to shuffle.
 */
const shuffleArray = <T>(array: T[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

/**
 * Select the top three most prominent colors.
 * @param colors - Array of extracted color objects.
 * @returns An array of three hex color strings.
 */
const selectTopThreeColors = (colors: { hex: string }[]): string[] => {
  return colors.slice(0, 3).map(color => color.hex);
};

/**
 * Select the first, middle, and last colors with slight randomness.
 * @param colors - Array of extracted color objects.
 * @returns An array of three hex color strings.
 */
const selectFirstMiddleLastColors = (colors: { hex: string }[]): string[] => {
  const firstColor = colors[0].hex;

  // Introduce slight randomness in selecting the middle color
  const middleIndex = Math.floor(colors.length / 2);
  const middleVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
  const adjustedMiddleIndex = Math.min(Math.max(middleIndex + middleVariation, 0), colors.length - 1);
  const middleColor = colors[adjustedMiddleIndex].hex;

  // Introduce slight randomness in selecting the last color
  const lastIndex = colors.length - 1;
  const lastVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or +1
  const adjustedLastIndex = Math.min(Math.max(lastIndex + lastVariation, 0), colors.length - 1);
  const lastColor = colors[adjustedLastIndex].hex;

  return [firstColor, middleColor, lastColor];
};

/**
 * Select three evenly distributed colors with added randomness.
 * @param colors - Array of extracted color objects.
 * @returns An array of three hex color strings.
 */
const selectEvenlyDistributedColors = (colors: { hex: string }[]): string[] => {
  const interval = Math.floor(colors.length / 4);
  const variation = Math.floor(Math.random() * interval) - Math.floor(interval / 2); // Introduce variation

  const firstIndex = 0 + variation;
  const secondIndex = interval + variation;
  const thirdIndex = 2 * interval + variation;

  // Ensure indices are within bounds
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  const firstColor = colors[clamp(firstIndex, 0, colors.length - 1)].hex;
  const secondColor = colors[clamp(secondIndex, 0, colors.length - 1)].hex;
  const thirdColor = colors[clamp(thirdIndex, 0, colors.length - 1)].hex;

  return [firstColor, secondColor, thirdColor];
};

/**
 * Select three random distinct colors from the extracted palette.
 * @param colors - Array of extracted color objects.
 * @returns An array of three hex color strings.
 */
const selectRandomThreeColors = (colors: { hex: string }[]): string[] => {
  shuffleArray(colors);
  return colors.slice(0, 3).map(color => color.hex);
};

// Define the selection methods
const selectionMethods = [
  selectTopThreeColors,
  selectFirstMiddleLastColors,
  selectEvenlyDistributedColors
  // Removed selectRandomThreeColors to limit to three methods
];

/**
 * Keeps track of the current selection method index.
 */
let currentSelectionIndex = 0;

/**
 * Cycle through the selection methods to pick three colors.
 * @param colors - Array of extracted color objects.
 * @returns An array of three hex color strings or null if not enough colors.
 */
const selectThreeColors = (colors: { hex: string }[]): string[] | null => {
  if (colors.length < 3) return null;

  const selectedMethod = selectionMethods[currentSelectionIndex];
  const selectedColors = selectedMethod(colors);

  // Update the index for next call
  currentSelectionIndex = (currentSelectionIndex + 1) % selectionMethods.length;

  return selectedColors;
};

/**
 * Extract three gradient colors from an image source.
 * @param imageSrc - The source URL of the image.
 * @returns An array of three hex color strings or null.
 */
export const getGradientFromImage = async (imageSrc: string): Promise<string[] | null> => {
  try {
    const colors = await extractColors(imageSrc); // Extract up to 10 colors

    console.log("Extracted colors:", colors);
    const selectedColors = selectThreeColors(colors);

    if (selectedColors) {
      return selectedColors;
    }
    return null;
  } catch (error) {
    console.error("Failed to extract colors:", error);
    return null;
  }
};