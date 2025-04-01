import type OpenAI from 'openai'
import { generateImage } from './tools/generateImage'
import { reddit } from './tools/reddit'
import { dadJoke } from './tools/dadJoke'
import { quizQuestion } from './tools/quizQuestion'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }
  switch (toolCall.function.name) {
    case 'generate_image':
      const image = await generateImage(input)
      return image

    case 'dad_joke':
      return dadJoke(input)

    case 'reddit':
      return reddit(input)

      case 'quiz_question':
      return quizQuestion(input)


    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}
