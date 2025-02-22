import type { AIMessage } from '../types'
import { runLLM } from './llm'
import { z } from 'zod'
import { runTool } from './toolRunner'
import { addMessages, getMessages, saveToolResponse } from './memory'
import { logMessage, showLoader } from './ui'

export const runAgent = async ({
  turns = 10,
  userMessage,
  tools = [],
}: {
  turns?: number
  userMessage: string
  tools?: { name: string; parameters: z.AnyZodObject }[]
}) => {
  await addMessages([
    {
      role: 'user',
      content: userMessage,
    },
  ])

  const loader = showLoader('Thinking...')
}
