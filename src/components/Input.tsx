'use client'

import { type useChat } from 'ai/react'
import { Send } from 'lucide-react'
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

type HandleInputChange = ReturnType<typeof useChat>['handleInputChange']
type HandleSubmit = ReturnType<typeof useChat>['handleSubmit']
type SetInput = ReturnType<typeof useChat>['setInput']

interface ChatInputProps {
  input: string
  handleInputChange: HandleInputChange
  handleSubmit: HandleSubmit
  setInput: SetInput
}

const Input = ({
  handleInputChange,
  handleSubmit,
  input,
  setInput,
}: ChatInputProps) => {
  return (
    <div className="absolute bottom-0 left-0 z-10 w-full bg-gray-900">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full flex-grow flex-col p-4">
            <form onSubmit={handleSubmit} className="relative">
              <Textarea
                rows={4}
                autoFocus
                onChange={handleInputChange}
                value={input}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit()
                    setInput('')
                  }
                }}
                placeholder="Enter your question..."
                className="resize-none rounded-xl bg-gray-800 text-base text-white hover:bg-gray-900"
              />

              <Button
                size="sm"
                type="submit"
                className="absolute bottom-2 right-2 z-10 border border-border bg-gray-900"
              >
                <Send className="size-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input
