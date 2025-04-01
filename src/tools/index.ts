import { generateImageToolDefinition } from './generateImage'
import { redditToolDefinition } from './reddit'
import { dadJokeToolDefinition } from './dadJoke'
import { quizQuestionToolDefinition } from './quizQuestion'

export const tools = [
  generateImageToolDefinition,
  redditToolDefinition,
  dadJokeToolDefinition,
  quizQuestionToolDefinition,
]
