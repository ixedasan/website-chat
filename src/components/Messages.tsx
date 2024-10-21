import { type Message as TMessage } from 'ai/react'
import { MessageSquare } from 'lucide-react'

import Item from './Item'

type Props = {
  messages: TMessage[]
}

const Messages = ({ messages }: Props) => {
  return (
    <div className="flex max-h-[calc(100vh-3.5rem-7rem)] flex-1 flex-col overflow-y-auto">
      {messages.length ? (
        messages.map((message, i) => (
          <Item
            key={i}
            content={message.content}
            isUserMessage={message.role === 'user'}
          />
        ))
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <MessageSquare className="size-8 text-blue-500" />
          <h3 className="text-xl font-semibold text-white">
            You&apos;re all set!
          </h3>
          <p className="text-sm text-gray-500">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default Messages
