import type { ToolFn } from '../../types'
import { openai } from '../ai'
import { z } from 'zod'

export const generateImageToolDefinition = {
  name: 'generate_image',
  parameters: z
    .object({
      prompt: z
        .string()
        .describe(
          'The prompt to use to generate the image with a diffusion model image generator like Dall-E'
        ),
    })
    .describe('Generates an image and returns the url of the image.'),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  try {
    // Try DALL-E 3 first
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: toolArgs.prompt,
      n: 1,
      size: '1024x1024',
    })
    
    const imageUrl = response.data[0].url!
    return imageUrl
  } catch (error: any) {
    if (error.code === 'model_not_found' || error.status === 403) {
      // Fall back to DALL-E 2 if DALL-E 3 is not available
      console.log('DALL-E 3 not available, falling back to DALL-E 2')
      const response = await openai.images.generate({
        model: 'dall-e-2',
        prompt: toolArgs.prompt,
        n: 1,
        size: '1024x1024',
      })
      
      const imageUrl = response.data[0].url!
      return imageUrl
    }
    throw error // Re-throw if it's a different error
  }
}
