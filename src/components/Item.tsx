import { Bot, User } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  content: string
  isUserMessage: boolean
}

const Item = ({ content, isUserMessage }: Props) => {
  return (
    <div
      className={cn({
        'bg-gray-800': isUserMessage,
        'bg-gray-900/25': !isUserMessage,
      })}
    >
      <div className="p-6">
        <div className="mx-auto flex max-w-3xl items-start gap-2.5">
          <div
            className={cn(
              'flex aspect-square size-10 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-gray-900',
              {
                'border-blue-700 bg-blue-950 text-gray-200': isUserMessage,
              },
            )}
          >
            {isUserMessage ? (
              <User className="size-5" />
            ) : (
              <Bot className="size-5 text-white" />
            )}
          </div>

          <div className="ml-6 flex w-full flex-col">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-white">
                {isUserMessage ? 'You' : 'Website'}
              </span>
            </div>

            <p className="py-2.5 text-sm font-normal text-white">{content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
