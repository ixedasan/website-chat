import { NextRequest } from 'next/server'
import { aiUseChatAdapter } from '@upstash/rag-chat/nextjs'

import { ragChat } from '@/lib/rag-chat'

export const POST = async (req: NextRequest) => {
  const { sessionId, messages } = await req.json()

  const lastMessage = messages[messages.length - 1].content

  const response = await ragChat.chat(lastMessage, {
    streaming: true,
    sessionId,
  })

  return aiUseChatAdapter(response)
}
