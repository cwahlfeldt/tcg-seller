// You might need to install the Tesseract.js library
// npm install tesseract.js

import Tesseract from 'tesseract.js';

const extractTextFromImage = async (imagePath: any) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath, 'eng');
    return text;
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw error;
  }
};

export default extractTextFromImage;
