'use client'

import { Message, useChat } from 'ai/react'

import Input from './Input'
import Messages from './Messages'

type Props = {
  sessionId: string
  initialMessages: Message[]
}

const Chat = ({ sessionId, initialMessages }: Props) => {
  const { messages, handleInputChange, handleSubmit, input, setInput } =
    useChat({
      api: '/api/chat-stream',
      body: { sessionId },
      initialMessages,
    })
  return (
    <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-gray-700 bg-gray-900">
      <div className="flex flex-1 flex-col justify-between bg-gray-800 text-black">
        <Messages messages={messages} />
      </div>

      <Input
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
      />
    </div>
  )
}

export default Chat
