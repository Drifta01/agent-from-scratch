import type { AIMessage } from '../types'
import { dadJoke } from './tools/dadJoke'
import { generateImage } from './tools/generateImage'
import { reddit } from './tools/reddit'

const toolFunctions = {
  dad_joke: dadJoke,
  generate_image: generateImage,
  reddit: reddit,
}

export const runTool = async (toolCall: any, userMessage: string): Promise<string> => {
  const { name, arguments: args } = toolCall.function
  const toolArgs = JSON.parse(args)
  
  const toolFn = toolFunctions[name as keyof typeof toolFunctions]
  
  if (!toolFn) {
    throw new Error(`Tool ${name} not found`)
  }
  
  try {
    const result = await toolFn({ userMessage, toolArgs })
    return typeof result === 'string' ? result : JSON.stringify(result)
  } catch (error) {
    console.error(`Error executing tool ${name}:`, error instanceof Error ? error.message : String(error))
    return `Error executing tool ${name}: ${error instanceof Error ? error.message : String(error)}`
  }
}