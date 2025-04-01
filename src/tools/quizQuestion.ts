import { z } from 'zod';
import type { ToolFn } from '../../types';
import fetch from 'node-fetch';

export const quizToolDefinition = {
  name: 'quiz_question',
  parameters: z.object({
    factId: z.string().optional(), // Add optional factId parameter
    category: z.string().optional(), // Add optional category parameter
  }),
};

type Args = z.infer<typeof quizToolDefinition.parameters>;

export const quizQuestion: ToolFn<Args, object> = async ({ toolArgs }) => {
  try {
    const { factId, category } = toolArgs;
    let url;

    if (factId) {
      url = 'https://api/v2/facts/random?language=en'; 
    } else if (category) {
      url = `https://uselessfacts.jsph.pl/random.json?language=en&category=${category}`; // Fix URL
    } else {
      url = 'https://uselessfacts.jsph.pl/random.json';
    }

    const response = await fetch(url);
    const data = await response.json();

    const fact = data.text;
    const question = `Based on the following fact, what is the most likely answer?\nFact: ${fact}`;
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Placeholder options
    const answer = "Option 1"; // Placeholder answer

    return { question, options, answer };
  } catch (error) {
    return { question: "Error fetching fact.", options: [], answer: null };
  }
};
