import { CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json()

  try {
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: 'You are a helpful assistant.',
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error: unknown) {
    console.error('Error in chat API:', error)
    
    if (error && typeof error === 'object' && 'message' in error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}